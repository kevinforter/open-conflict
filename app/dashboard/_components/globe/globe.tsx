import { type MutableRefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ThreeGlobe from "three-globe";
import gsap from "gsap"; // Animation library
// Use relative path for cross-project compatibility (Vite root vs Frontend root)
import globeMapUrl from "@/public/map/globe-map.jpg";
import globeTopoUrl from "@/public/map/globe-topology.png";
import { INITIAL_OFFSET_Y, INITIAL_OFFSET_Z, INITIAL_TILT } from "./constants";
import { type GeoJson, getCountryCoordinates } from "./geoUtils";

interface UseGlobeSceneParams {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  hasStarted: boolean;
  geoJson: GeoJson;
  activeCountries?: string[];
  selectedCountry?: string | null;
  onSceneReady?: () => void;
}

// Function to safely get image source URL whether imported as string (Vite) or object (Next.js)
const getImgSrc = (img: any) => {
  return typeof img === "string" ? img : img.src;
};

// Helper to convert Lat/Lon to 3D Vector on a sphere of radius R
const toVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lon * (Math.PI / 180);

  // X = R * sin(phi) * sin(theta)
  // Y = R * cos(phi)
  // Z = R * sin(phi) * cos(theta)
  // Maps Lon 0 to (0,0,R) -> +Z axis (Front)
  // Maps Lon 90 to (R,0,0) -> +X axis (Right)

  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
};

export function useGlobeScene({
  containerRef,
  hasStarted,
  geoJson,
  activeCountries = [],
  selectedCountry,
  onSceneReady,
}: UseGlobeSceneParams) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const hasStartedRef = useRef(hasStarted);
  const globeGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    hasStartedRef.current = hasStarted;
  }, [hasStarted]);

  // Update highlighted countries when activeCountries changes
  useEffect(() => {
    if (globeRef.current && geoJson) {
      // Update styling accessors FIRST
      globeRef.current
        .polygonCapColor((d: any) => {
          const props = d.properties;
          // Match against ISO Alpha-2 code, ignoring "-99"
          let isoCode = props.iso_a2 !== "-99" ? props.iso_a2 : null;
          isoCode =
            isoCode ||
            (props.ISO_A2 !== "-99" ? props.ISO_A2 : null) ||
            props.iso_a2_eh ||
            props.wb_a2;

          const isActive = activeCountries.includes(isoCode);
          const isSelected = selectedCountry === isoCode;

          if (selectedCountry) {
            if (isSelected) return "rgba(220, 60, 60, 0.25)"; // Highlight selected
            if (isActive) return "rgba(220, 60, 60, 0.05)"; // Dim others
            return "transparent";
          }
          return isActive ? "rgba(220, 60, 60, 0.25)" : "transparent";
        })
        .polygonSideColor(() => "transparent")
        .polygonStrokeColor((d: any) => {
          const props = d.properties;
          let isoCode = props.iso_a2 !== "-99" ? props.iso_a2 : null;
          isoCode =
            isoCode ||
            (props.ISO_A2 !== "-99" ? props.ISO_A2 : null) ||
            props.iso_a2_eh ||
            props.wb_a2;

          const isSelected = selectedCountry === isoCode;

          if (selectedCountry && isSelected) return "rgba(255, 200, 200, 0.6)";
          return "rgba(200, 200, 200, 0.3)";
        })
        .polygonAltitude(() => 0.01)
        // Set data LAST to trigger update with new accessors
        .polygonsData(geoJson.features);
    }
  }, [activeCountries, geoJson, selectedCountry]);

  // Handle Zoom to Country
  useEffect(() => {
    if (
      !geoJson ||
      !controlsRef.current ||
      !cameraRef.current ||
      !globeGroupRef.current
    )
      return;

    if (selectedCountry) {
      // Stop rotation for inspection
      controlsRef.current.autoRotate = false;

      // 1. Find Coordinates
      const coords = getCountryCoordinates(selectedCountry, geoJson);
      if (coords) {
        // Globe Radius is ~100 (native ThreeGlobe size)
        // But we put the globe in a group with rotation and position offsets.
        // We need to calculate the target position in WORLD space.

        // Raw position on the sphere (Radius 100)
        const rawVec = toVector3(coords.lat, coords.lon, 100);

        // Apply the GlobeGroup's transformation to this vector to get the actual world position
        // The Globe object itself is usually at (0,0,0) inside the group
        // The Group has rotation (Initial Tilt) and Position offset

        const targetPos = rawVec.clone();
        targetPos.applyEuler(globeGroupRef.current.rotation);
        targetPos.add(globeGroupRef.current.position);

        // Camera Position: We want to be "above" the target.
        // Vector from Center (Group Position) to Target
        const direction = new THREE.Vector3()
          .subVectors(targetPos, globeGroupRef.current.position)
          .normalize();

        const isMobile = window.innerWidth <= 768;

        // Calculate Right vector for screen-space offset
        // We want the country to appear on the LEFT (so sidebar doesn't cover it).
        // So we shift the camera to the RIGHT.
        // Right = Up x Direction
        const up = new THREE.Vector3(0, 1, 0);
        const right = new THREE.Vector3()
          .crossVectors(up, direction)
          .normalize();

        // Distance to zoom in (e.g., 200 units from center, so 100 units above surface)
        // Zoom out slightly more on mobile to account for smaller screen real estate
        const zoomDistance = isMobile ? 280 : 220;
        const horizontalOffset = isMobile ? 0 : 50; // No offset on mobile (center it)

        const cameraTargetPos = globeGroupRef.current.position
          .clone()
          .add(direction.multiplyScalar(zoomDistance))
          .add(right.multiplyScalar(horizontalOffset));

        // Animate
        // Target the CENTER of the globe, not the surface point, so rotation orbits the earth
        gsap.to(controlsRef.current.target, {
          x: globeGroupRef.current.position.x,
          y: globeGroupRef.current.position.y,
          z: globeGroupRef.current.position.z,
          duration: 1.5,
          ease: "power2.inOut",
        });

        gsap.to(cameraRef.current.position, {
          x: cameraTargetPos.x,
          y: cameraTargetPos.y,
          z: cameraTargetPos.z,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            controlsRef.current?.update();
          }, // Ensure controls verify new position
        });
      }
    } else {
      // Resume rotation
      controlsRef.current.autoRotate = true;

      // Reset to initial view if deselected
      const initialLookAt = new THREE.Vector3(
        0,
        INITIAL_OFFSET_Y * 100,
        INITIAL_OFFSET_Z * 100,
      );

      // Initial camera position was Z=320, Y=0 (relative to world origin)
      // Adjust for desired "Home" view

      gsap.to(controlsRef.current.target, {
        x: initialLookAt.x,
        y: initialLookAt.y,
        z: initialLookAt.z,
        duration: 1.5,
        ease: "power2.inOut",
      });

      const isMobile = window.innerWidth <= 768;
      const targetZ = isMobile ? 550 : 380;

      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 0,
        z: targetZ,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          controlsRef.current?.update();
        },
      });
    }
  }, [selectedCountry, geoJson]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      4000, // Increased far plane
    );
    // Scale up camera position (was 3.75 -> 320 for radius 100 globe)
    // User requested less zoom on mobile (<= 768px)
    const isMobile = window.innerWidth <= 768;
    camera.position.z = isMobile ? 550 : 380;
    camera.position.y = 0;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.enabled = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 50;
    controls.maxDistance = 500;
    // Scale offsets by 100 since globe radius is ~100
    controls.target.set(0, INITIAL_OFFSET_Y * 100, INITIAL_OFFSET_Z * 100);
    controlsRef.current = controls;

    scene.add(new THREE.AmbientLight(0xffffff, 2.0));
    const dir = new THREE.DirectionalLight(0xffffff, 3.5);
    dir.position.set(500, 300, 500); // Scaled lights
    scene.add(dir);

    // Creates the Globe
    const globe = new ThreeGlobe()
      .globeImageUrl(getImgSrc(globeMapUrl))
      .bumpImageUrl(getImgSrc(globeTopoUrl))
      .showAtmosphere(false); // We use custom atmosphere

    // No manual scaling - use native radius ~100

    // Initial Polygon Setup
    globe
      .polygonsData(geoJson.features)
      .polygonCapColor((d: any) => {
        const name =
          d.properties?.NAME ||
          d.properties?.name ||
          d.properties?.admin ||
          d.properties?.ADMIN;
        return activeCountries.includes(name)
          ? "rgba(220, 60, 60, 0.25)"
          : "transparent";
      })
      .polygonSideColor(() => "transparent")
      .polygonStrokeColor(() => "rgba(200, 200, 200, 0.3)")
      .polygonAltitude(0.01); // 0.1 units relative to radius 100? or absolute? ThreeGlobe is usually absolute > 0.

    globeRef.current = globe;

    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup; // Helper ref for animation
    globeGroup.add(globe);

    // Custom Atmosphere - Scale radius to match (approx 1.6x globe radius)
    // If globe R=100, Atmosphere R=160
    const atmosphereGeometry = new THREE.SphereGeometry(160, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.5 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.2, 0.4, 0.8, intensity * 0.12);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(
      atmosphereGeometry,
      atmosphereMaterial,
    );
    // Align atmosphere with globe position (globe group handles global pos)
    globeGroup.add(atmosphereMesh);

    globeGroup.rotation.x = INITIAL_TILT;
    // Scale offsets for group position
    globeGroup.position.y = INITIAL_OFFSET_Y * 100;
    globeGroup.position.z = INITIAL_OFFSET_Z * 100;
    scene.add(globeGroup);

    // Animation Loop
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!hasStartedRef.current) {
        globeGroup.rotation.y += 0.0008;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    onSceneReady?.();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      scene.remove(globeGroup, dir);
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controlsRef.current = null;
      cameraRef.current = null;
      globeRef.current = null;
    };
  }, [
    containerRef,
    geoJson,
    onSceneReady /* activeCountries dependencies are handled in the specific effect */,
  ]);

  return { cameraRef, controlsRef };
}

// Default component export for easy usage
export default function Globe({
  geoJson = { type: "FeatureCollection", features: [] },
  activeCountries = [],
  selectedCountry = null,
  onSceneReady,
}: {
  geoJson?: GeoJson;
  activeCountries?: string[];
  selectedCountry?: string | null;
  onSceneReady?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGlobeScene({
    containerRef,
    hasStarted: true,
    geoJson,
    activeCountries,
    selectedCountry,
    onSceneReady,
  });

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[500px]"
      style={{ background: "transparent" }}
    />
  );
}
