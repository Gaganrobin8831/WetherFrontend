import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const Earth3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("/Assets/earthMap.jpg");
    const bumpMap = loader.load("/Assets/earthBump.jpg");
    const specMap = loader.load("/Assets/earthSpec.jpg");

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpMap,
        bumpScale: 0.05,
        specularMap: specMap,
        shininess: 10,
      })
    );

    scene.add(earth);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 3, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x444444));

    gsap.to(earth.rotation, {
      y: "+=6.28",
      duration: 12,
      ease: "none",
      repeat: -1,
    });

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
   
     <div
      ref={mountRef}
      className="w-[200px] h-[200px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]"

      
    />

  );
};

export default Earth3D;
