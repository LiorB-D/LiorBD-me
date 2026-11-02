"use client";

import { useEffect, useRef } from "react";

export default function BlueJay() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let cleanup = () => {};

    async function start() {
      if (motion.matches || disposed) return;
      const THREE = await import("three");
      if (disposed || motion.matches) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return; // Decorative animation is optional when WebGL is unavailable.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container!.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 100);
      camera.position.set(0, 0, 20);
      // Unlit materials keep the tiny silhouette clear without lighting costs.
      const blue = new THREE.MeshBasicMaterial({ color: 0x2686dc });
      const navy = new THREE.MeshBasicMaterial({ color: 0x142d4c });
      const white = new THREE.MeshBasicMaterial({ color: 0xeaf5ff });
      const red = new THREE.MeshBasicMaterial({ color: 0xd83139 });
      const darkRed = new THREE.MeshBasicMaterial({ color: 0x8f2032 });
      const charcoal = new THREE.MeshBasicMaterial({ color: 0x252c38 });
      const teal = new THREE.MeshBasicMaterial({ color: 0x284b4c });
      const orange = new THREE.MeshBasicMaterial({ color: 0xef7838 });
      const yellow = new THREE.MeshBasicMaterial({ color: 0xe6bc54 });
      const materials = [blue, navy, white, red, darkRed, charcoal, teal, orange, yellow];
      // Every species shares one eight-triangle geometry (56–72 triangles per bird).
      const geometry = new THREE.OctahedronGeometry(1, 0);
      function part(parent: InstanceType<typeof THREE.Group>, material: InstanceType<typeof THREE.MeshBasicMaterial>, position: number[], scale: number[]) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position[0], position[1], position[2]);
        mesh.scale.set(scale[0], scale[1], scale[2]);
        parent.add(mesh);
        return mesh;
      }
      const species = [
        { name: "blue-jay", count: 5, body: blue, belly: white, wing: navy, beak: navy, crest: true, tail: 0.58 },
        { name: "northern-cardinal", count: 5, body: red, belly: red, wing: darkRed, beak: orange, crest: true, tail: 0.5 },
        { name: "european-starling", count: 8, body: charcoal, belly: teal, wing: charcoal, beak: yellow, crest: false, tail: 0.28 },
      ];
      const templates = species.map((kind) => {
      const bird = new THREE.Group();
      part(bird, kind.body, [0, 0, 0], [0.66, 0.34, 0.32]);
      part(bird, kind.belly, [0.05, -0.12, 0.13], [0.52, 0.24, 0.26]);
      part(bird, kind.body, [0.53, 0.29, 0], [0.3, 0.28, 0.26]);
      if (kind.crest) part(bird, kind.body, [0.41, 0.55, 0], [0.15, 0.3, 0.14]).rotation.z = 0.5;
      if (kind.name === "northern-cardinal") {
        part(bird, charcoal, [0.7, 0.24, 0.13], [0.14, 0.19, 0.16]);
      }
      part(bird, kind.beak, [0.86, 0.26, 0], [0.25, kind.name === "northern-cardinal" ? 0.12 : 0.07, 0.09]);
      part(bird, kind.body, [-0.65 - kind.tail * 0.33, -0.05, 0], [kind.tail, 0.07, 0.16]).rotation.z = 0.12;
      [-1, 1].forEach((side) => {
        const wing = new THREE.Group();
        wing.name = side === -1 ? "left-wing" : "right-wing";
        wing.position.set(-0.08, 0.13, side * 0.18);
        bird.add(wing);
        part(wing, kind.wing, [-0.16, 0, side * 0.48], [0.43, 0.07, kind.crest ? 0.62 : 0.72]);
      });
      return bird;
      });
      let halfWidth = 8;
      let pageHeight = 10;
      // Stable document coordinates: 100 CSS pixels per world unit.
      const unit = 0.01;
      const flock = species.flatMap((kind, speciesIndex) => Array.from({ length: kind.count }, () => {
        // Clones share geometry and materials while keeping independent transforms.
        const model = templates[speciesIndex].clone(true);
        const heading = new THREE.Group();
        heading.add(model);
        scene.add(heading);
        return {
          species: kind.name,
          heading,
          model,
          leftWing: model.getObjectByName("left-wing")!,
          rightWing: model.getObjectByName("right-wing")!,
          velocity: new THREE.Vector2(),
          acceleration: new THREE.Vector2(),
          wanderDirection: new THREE.Vector2(),
          wanderTime: Math.random() * 2,
          facingLeft: false,
          flapOffset: Math.random() * Math.PI * 2,
          flapSpeed: 10 + Math.random() * 4,
        };
      }));

      function flightBounds() {
        const horizontalMargin = Math.max(window.innerWidth * unit, 600 * unit) * 0.75;
        const verticalMargin = Math.max(window.innerHeight * unit, 500 * unit) * 0.75;
        return {
          left: -horizontalMargin,
          right: halfWidth * 2 + horizontalMargin,
          bottom: -pageHeight - verticalMargin,
          top: verticalMargin,
        };
      }

      function spawn(entry: (typeof flock)[number]) {
        const angle = Math.random() * Math.PI * 2;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        // Uniformly populate the entire flight area, including off-page padding.
        const bounds = flightBounds();
        const speed = (45 + Math.random() * 40) * unit;
        entry.heading.position.set(
          bounds.left + Math.random() * (bounds.right - bounds.left),
          bounds.bottom + Math.random() * (bounds.top - bounds.bottom),
          0,
        );
        entry.velocity.set(dx * speed, dy * speed);
        entry.wanderDirection.set(dx, dy);
        entry.facingLeft = dx < 0;
        entry.heading.rotation.z = angle;
        const scale = (36 / 2.53) * unit;
        entry.model.scale.setScalar(scale);
        entry.model.rotation.set(entry.facingLeft ? Math.PI - 0.2 : 0.2, -0.2, 0);
      }

      function measurePage() {
        halfWidth = Math.max(document.body.scrollWidth, document.documentElement.clientWidth) * unit / 2;
        pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight) * unit;
      }
      function syncCamera() {
        camera.position.x = window.scrollX * unit;
        camera.position.y = -window.scrollY * unit;
      }
      function resize() {
        const height = window.innerHeight;
        measurePage();
        camera.left = 0;
        camera.right = window.innerWidth * unit;
        camera.top = 0;
        camera.bottom = -height * unit;
        camera.updateProjectionMatrix();
        syncCamera();
        renderer.setSize(window.innerWidth, height);
      }
      resize();
      flock.forEach(spawn);
      window.addEventListener("resize", resize);
      window.addEventListener("scroll", syncCamera, { passive: true });
      const pageObserver = new ResizeObserver(measurePage);
      pageObserver.observe(document.body);
      pageObserver.observe(document.documentElement);
      let frame = 0;
      let elapsed = 0;
      let previous = performance.now();
      const separation = new THREE.Vector2();
      const alignment = new THREE.Vector2();
      const cohesion = new THREE.Vector2();
      const boundary = new THREE.Vector2();
      const steer = new THREE.Vector2();
      const pointer = new THREE.Vector2();
      const avoidance = new THREE.Vector2();
      let pointerActive = false;
      function trackPointer(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        pointer.set(event.clientX, event.clientY);
        pointerActive = true;
      }
      function clearPointer() { pointerActive = false; }
      // Listen on the window: the decorative canvas remains click-through.
      window.addEventListener("pointermove", trackPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", clearPointer);
      window.addEventListener("pointercancel", clearPointer);
      window.addEventListener("blur", clearPointer);

      function updateFlock(delta: number) {
        const neighborRadius = 240 * unit;
        const separationRadius = 48 * unit;
        const crossSpeciesRadius = 140 * unit;
        const maxSpeed = 85 * unit;
        const minSpeed = 45 * unit;
        const maxForce = 45 * unit;
        const cursorRadius = 160 * unit;
        // The visible viewport is a window into a larger flight area.
        // Leave three quarters of a viewport beyond each document edge.
        const bounds = flightBounds();
        // Calculate every force before moving any bird: all use the same snapshot.
        for (const entry of flock) {
          separation.set(0, 0);
          alignment.set(0, 0);
          cohesion.set(0, 0);
          entry.acceleration.set(0, 0);
          let neighbors = 0;
          const position = entry.heading.position;
          for (const other of flock) {
            if (other === entry) continue;
            const dx = other.heading.position.x - position.x;
            const dy = other.heading.position.y - position.y;
            const distanceSquared = dx * dx + dy * dy;
            if (distanceSquared > neighborRadius * neighborRadius) continue;
            const sameSpecies = other.species === entry.species;
            if (sameSpecies) {
              neighbors++;
              alignment.add(other.velocity);
              cohesion.x += dx;
              cohesion.y += dy;
            }
            // Other species need flock-sized space, not just collision clearance.
            const clearance = sameSpecies ? separationRadius : crossSpeciesRadius;
            if (distanceSquared < clearance * clearance) {
              // Inverse-distance repulsion gives nearby birds priority.
              if (distanceSquared > 1e-10) {
                separation.x -= dx / distanceSquared;
                separation.y -= dy / distanceSquared;
              } else {
                separation.x += Math.cos(entry.flapOffset);
                separation.y += Math.sin(entry.flapOffset);
              }
            }
          }
          const applySteering = (desired: InstanceType<typeof THREE.Vector2>, weight: number) => {
            if (desired.lengthSq() < 1e-10) return;
            steer.copy(desired).setLength(maxSpeed).sub(entry.velocity).clampLength(0, maxForce);
            entry.acceleration.addScaledVector(steer, weight);
          };
          // Hold a random preference long enough to make a smooth arc instead
          // of adding frame-by-frame jitter. Each bird changes its mind independently.
          entry.wanderTime -= delta;
          if (entry.wanderTime <= 0) {
            const heading = Math.atan2(entry.velocity.y, entry.velocity.x);
            const turn = (0.4 + Math.random() * 1.1) * (Math.random() < 0.5 ? -1 : 1);
            entry.wanderDirection.set(Math.cos(heading + turn), Math.sin(heading + turn));
            entry.wanderTime = 2 + Math.random() * 3;
          }
          applySteering(entry.wanderDirection, neighbors > 0 ? 0.5 : 0.85);
          applySteering(separation, 1.8);
          if (neighbors > 0) {
            applySteering(alignment.divideScalar(neighbors), 1);
            applySteering(cohesion.divideScalar(neighbors), 0.65);
          }
          // Turn back only well outside the viewport, allowing natural exits.
          boundary.set(
            position.x < bounds.left ? 1 : position.x > bounds.right ? -1 : 0,
            position.y < bounds.bottom ? 1 : position.y > bounds.top ? -1 : 0,
          );
          applySteering(boundary, 1.5);
          if (pointerActive) {
            avoidance.set(
              position.x - (pointer.x + window.scrollX) * unit,
              position.y + (pointer.y + window.scrollY) * unit,
            );
            const distance = avoidance.length();
            if (distance < cursorRadius) {
              if (distance < 1e-8) {
                avoidance.set(Math.cos(entry.flapOffset), Math.sin(entry.flapOffset));
              }
              applySteering(avoidance, 5 * (1 - distance / cursorRadius));
            }
          }
          entry.acceleration.clampLength(0, maxForce * 2);
        }
        for (const entry of flock) {
          entry.velocity.addScaledVector(entry.acceleration, delta);
          entry.velocity.clampLength(minSpeed, maxSpeed);
          entry.heading.position.x += entry.velocity.x * delta;
          entry.heading.position.y += entry.velocity.y * delta;
          const angle = Math.atan2(entry.velocity.y, entry.velocity.x);
          // Follow the shortest angular arc, including across the ±PI boundary.
          const turn = Math.atan2(
            Math.sin(angle - entry.heading.rotation.z),
            Math.cos(angle - entry.heading.rotation.z),
          );
          entry.heading.rotation.z += turn * (1 - Math.exp(-12 * delta));
          // A dead band around vertical prevents repeated side changes. Roll
          // smoothly around the flight axis instead of reflecting the geometry.
          const horizontalDirection = entry.velocity.x / entry.velocity.length();
          if (horizontalDirection < -0.2) entry.facingLeft = true;
          else if (horizontalDirection > 0.2) entry.facingLeft = false;
          const roll = entry.facingLeft ? Math.PI - 0.2 : 0.2;
          entry.model.rotation.x += (roll - entry.model.rotation.x) * (1 - Math.exp(-5 * delta));
        }
      }

      function animate(now: number) {
        const delta = Math.min((now - previous) / 1000, 0.05);
        elapsed += delta;
        previous = now;
        // Small substeps keep steering stable across different refresh rates.
        const steps = Math.max(1, Math.ceil(delta / (1 / 60)));
        for (let i = 0; i < steps; i++) updateFlock(delta / steps);
        for (const entry of flock) {
          const flap = Math.sin(elapsed * entry.flapSpeed + entry.flapOffset) * 0.85;
          entry.leftWing.rotation.x = 0.5 + flap;
          entry.rightWing.rotation.x = -0.5 - flap;
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      }
      function visibility() {
        cancelAnimationFrame(frame);
        if (document.hidden) clearPointer();
        if (!document.hidden) {
          previous = performance.now();
          frame = requestAnimationFrame(animate);
        }
      }
      document.addEventListener("visibilitychange", visibility);
      visibility();
      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", syncCamera);
        pageObserver.disconnect();
        document.removeEventListener("visibilitychange", visibility);
        window.removeEventListener("pointermove", trackPointer);
        document.documentElement.removeEventListener("pointerleave", clearPointer);
        window.removeEventListener("pointercancel", clearPointer);
        window.removeEventListener("blur", clearPointer);
        geometry.dispose();
        materials.forEach((material) => material.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    const onMotionChange = () => { cleanup(); cleanup = () => {}; void start(); };
    motion.addEventListener("change", onMotionChange);
    void start();
    return () => {
      disposed = true;
      motion.removeEventListener("change", onMotionChange);
      cleanup();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />;
}
