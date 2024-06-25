
import React, { useRef, useEffect, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders'; // Ensure loaders are included for external assets
import { openDatabase, addScene, getScene } from './database';

const BabylonViewer = () => {
  const canvasRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    // Open the IndexedDB and initialize Babylon.js engine and scene
    openDatabase().then(() => {
      const engine = new BABYLON.Engine(canvasRef.current, true);
      const scene = new BABYLON.Scene(engine);

      // Set up the camera
      const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
      camera.setPosition(new BABYLON.Vector3(0, 0, -10));
      camera.attachControl(canvasRef.current, true);

      // Set up the light
      new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

      // Start the render loop
      engine.runRenderLoop(() => {
        scene.render();
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        engine.resize();
      });

      // Set state
      setScene(scene);
      setEngine(engine);

      // Clean up on unmount
      return () => {
        window.removeEventListener('resize', () => {
          engine.resize();
        });
        scene.dispose();
        engine.dispose();
      };
    });
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = async () => {
        const data = reader.result;
        const sceneData = { name: file.name, data: data };
        
        // Store scene data in IndexedDB and wait for completion
        const sceneId = await addScene(sceneData);
        console.log(`Scene added with ID: ${sceneId}`);

        // Load the scene from DB after storing
        const sceneDataFromDB = await getScene(sceneId);
        if (sceneDataFromDB) {
          BABYLON.SceneLoader.Append('', sceneDataFromDB.data, scene, (loadedScene) => {
            // Calculate and log the bounding box for each mesh
            loadedScene.meshes.forEach(mesh => {
              const boundingInfo = mesh.getBoundingInfo();
              const boundingBox = boundingInfo.boundingBox;
              console.log(`Bounding Box for mesh ${mesh.name}:`, boundingBox);
            });

            // Adjust camera to focus on the loaded scene
            if (scene.activeCamera) {
              scene.activeCamera.attachControl(canvasRef.current, true);
            }
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept=".babylon,.gltf,.glb"
        onChange={handleFileChange}
      />
      <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100vh - 40px)' }} />
    </div>
  );
};

export default BabylonViewer;








