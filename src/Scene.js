// import React, { useRef, useEffect, useState } from 'react';
// import * as BABYLON from '@babylonjs/core';
// import '@babylonjs/loaders'; // Make sure to include loaders if you use external assets
// import { openDatabase, addScene, getScene } from './database';

// const BabylonViewer = () => {
//   const canvasRef = useRef(null);
//   const [scene, setScene] = useState(null);
//   const [engine, setEngine] = useState(null);
//   const modelPositions = useRef([])

//   useEffect(() => {
//     openDatabase().then(() => {
//       const engine = new BABYLON.Engine(canvasRef.current, true);
//       const scene = new BABYLON.Scene(engine);
//       const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
//       camera.setPosition(new BABYLON.Vector3(0, 0, -10));
//       camera.attachControl(canvasRef.current, true);
      
//       const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

//       engine.runRenderLoop(() => {
//         scene.render();
//       });

//       window.addEventListener('resize', () => {
//         engine.resize();
//       });

//       setScene(scene);
//       setEngine(engine);

//       return () => {
//         window.removeEventListener('resize', () => {
//           engine.resize();
//         });
//         scene.dispose();
//         engine.dispose();
//       };
//     });
//   }, []);

//   const handleFileChange = (event) => {
//     const files = event.target.files;

//     Array.from(files).forEach(file => {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const data = reader.result;
//         await BABYLON.SceneLoader.Append('', data, scene, (loadedScene) => {
//           // Adjust camera to focus on the loaded scene
//           if (scene.activeCamera) {
//             scene.activeCamera.attachControl(canvasRef.current, true);
//           }
//         });
        
//         // Store scene data in IndexedDB
//         const sceneData = { name: file.name, data: data };
//         const sceneId = await addScene(sceneData);
//         console.log(`Scene added with ID: ${sceneId}`);
//       };
//       reader.readAsDataURL(file);
//     });
//   };





//   const loadSceneFromDB = async (id) => {
//     const sceneData = await getScene(id);
//     if (sceneData) {
//       BABYLON.SceneLoader.Append('', sceneData.data, scene, (loadedScene) => {
//         if (scene.activeCamera) {
//           scene.activeCamera.attachControl(canvasRef.current, true);
//         }
//       });
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         multiple
//         accept=".babylon,.gltf,.glb"
//         onChange={handleFileChange}
//       />
//       <button onClick={() => loadSceneFromDB(40)}>Load Scene from DB</button> {/* Example button to load a scene by ID */}
//       <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100vh - 40px)' }} />
//     </div>
//   );
// };

// export default BabylonViewer;








// import React, { useRef, useEffect, useState } from 'react';
// import * as BABYLON from '@babylonjs/core';
// import '@babylonjs/loaders'; // Make sure to include loaders if you use external assets
// import { openDatabase, addScene, getScene } from './database';

// const BabylonViewer = () => {
//   const canvasRef = useRef(null);
//   const [scene, setScene] = useState(null);
//   const [engine, setEngine] = useState(null);

//   useEffect(() => {
//     openDatabase().then(() => {
//       const engine = new BABYLON.Engine(canvasRef.current, true);
//       const scene = new BABYLON.Scene(engine);
//       const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
//       camera.setPosition(new BABYLON.Vector3(0, 0, -10));
//       camera.attachControl(canvasRef.current, true);
      
//       const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

//       engine.runRenderLoop(() => {
//         scene.render();
//       });

//       window.addEventListener('resize', () => {
//         engine.resize();
//       });

//       setScene(scene);
//       setEngine(engine);

//       return () => {
//         window.removeEventListener('resize', () => {
//           engine.resize();
//         });
//         scene.dispose();
//         engine.dispose();
//       };
//     });
//   }, []);

//   const handleFileChange = (event) => {
//     const files = event.target.files;

//     Array.from(files).forEach(file => {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const data = reader.result;
//         const sceneData = { name: file.name, data: data };
        
//         // Store scene data in IndexedDB and wait for completion
//         const sceneId = await addScene(sceneData);
//         console.log(`Scene added with ID: ${sceneId}`);

//         // Load the scene after data is stored
//         BABYLON.SceneLoader.Append('', data, scene, (loadedScene) => {
//           // Calculate and log the bounding box for each mesh
//           loadedScene.meshes.forEach(mesh => {
//             const boundingInfo = mesh.getBoundingInfo();
//             const boundingBox = boundingInfo.boundingBox;
//             console.log(`Bounding Box for mesh ${mesh.name}:`, boundingBox);
//           });

//           // Adjust camera to focus on the loaded scene
//           if (scene.activeCamera) {
//             scene.activeCamera.attachControl(canvasRef.current, true);
//           }
//         });
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const loadSceneFromDB = async (id) => {
//     const sceneData = await getScene(id);

//     if (sceneData) {
//       BABYLON.SceneLoader.Append('', sceneData.data, scene, (loadedScene) => {
//         loadedScene.meshes.forEach(mesh => {
//           const boundingInfo = mesh.getBoundingInfo();
//           const boundingBox = boundingInfo.boundingBox;
//           console.log(`Bounding Box for mesh ${mesh.name}:`, boundingBox);
         
//         });

//         if (scene.activeCamera) {
//           scene.activeCamera.attachControl(canvasRef.current, true);
//         }
//       });
//     }
//   };


//   return (
//     <div>
//       <input
//         type="file"
//         multiple
//         accept=".babylon,.gltf,.glb"
//         onChange={handleFileChange}
//       />
//       <button onClick={() => loadSceneFromDB(57)}>Load Scene from DB</button> {/* Example button to load a scene by ID */}
//       <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100vh - 40px)' }} />
//     </div>
//   );
// };

// export default BabylonViewer;






// import React, { useRef, useEffect, useState } from 'react';
// import * as BABYLON from '@babylonjs/core';
// import '@babylonjs/loaders'; // Make sure to include loaders if you use external assets
// import { openDatabase, addScene, getScene } from './database';

// const BabylonViewer = () => {
//   const canvasRef = useRef(null);
//   const [scene, setScene] = useState(null);
//   const [engine, setEngine] = useState(null);

//   useEffect(() => {
//     openDatabase().then(() => {
//       const engine = new BABYLON.Engine(canvasRef.current, true);
//       const scene = new BABYLON.Scene(engine);
//       const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
//       camera.setPosition(new BABYLON.Vector3(0, 0, -10));
//       camera.attachControl(canvasRef.current, true);
      
//       const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

//       engine.runRenderLoop(() => {
//         scene.render();
//       });

//       window.addEventListener('resize', () => {
//         engine.resize();
//       });

//       setScene(scene);
//       setEngine(engine);

//       return () => {
//         window.removeEventListener('resize', () => {
//           engine.resize();
//         });
//         scene.dispose();
//         engine.dispose();
//       };
//     });
//   }, []);

//   const handleFileChange = (event) => {
//     const files = event.target.files;

//     Array.from(files).forEach(file => {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const data = reader.result;
//         const sceneData = { name: file.name, data: data };
        
//         // Store scene data in IndexedDB and wait for completion
//         const sceneId = await addScene(sceneData);
//         console.log(`Scene added with ID: ${sceneId}`);

//         // Load the scene after data is stored
//         BABYLON.SceneLoader.Append('', data, scene, (loadedScene) => {
//           // Calculate and log the bounding box for each mesh
//           loadedScene.meshes.forEach(mesh => {
//             const boundingInfo = mesh.getBoundingInfo();
//             const boundingBox = boundingInfo.boundingBox;
//             console.log(`Bounding Box for mesh ${mesh.name}:`, boundingBox);
//           });

//           // Adjust camera to focus on the loaded scene
//           if (scene.activeCamera) {
//             scene.activeCamera.attachControl(canvasRef.current, true);
//           }
//         });
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         multiple
//         accept=".babylon,.gltf,.glb"
//         onChange={handleFileChange}
//       />
//       <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100vh - 40px)' }} />
//     </div>
//   );
// };

// export default BabylonViewer;







// import React, { useRef, useEffect, useState } from 'react';
// import * as BABYLON from '@babylonjs/core';
// import '@babylonjs/loaders'; // Ensure loaders are included for external assets
// import { openDatabase, addScene, getScene } from './database';

// const BabylonViewer = () => {
//   const canvasRef = useRef(null);
//   const [scene, setScene] = useState(null);
//   const [engine, setEngine] = useState(null);

//   useEffect(() => {
//     // Open the IndexedDB and initialize Babylon.js engine and scene
//     openDatabase().then(() => {
//       const engine = new BABYLON.Engine(canvasRef.current, true);
//       const scene = new BABYLON.Scene(engine);

//       // Set up the camera
//       const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
//       camera.setPosition(new BABYLON.Vector3(0, 0, -10));
//       camera.attachControl(canvasRef.current, true);

//       // Set up the light
//       new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

//       // Start the render loop
//       engine.runRenderLoop(() => {
//         scene.render();
//       });

//       // Handle window resize
//       window.addEventListener('resize', () => {
//         engine.resize();
//       });

//       // Set state
//       setScene(scene);
//       setEngine(engine);

//       // Clean up on unmount
//       return () => {
//         window.removeEventListener('resize', () => {
//           engine.resize();
//         });
//         scene.dispose();
//         engine.dispose();
//       };
//     });
//   }, []);

//   const handleFileChange = (event) => {
//     const files = event.target.files;

//     Array.from(files).forEach(file => {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const data = reader.result;
//         const sceneData = { name: file.name, data: data };
        
//         // Store scene data in IndexedDB and wait for completion
//         const sceneId = await addScene(sceneData);
//         console.log(`Scene added with ID: ${sceneId}`);

//         // Load the scene from DB after storing
//         const sceneDataFromDB = await getScene(sceneId);
//         if (sceneDataFromDB) {
//           BABYLON.SceneLoader.Append('', sceneDataFromDB.data, scene, (loadedScene) => {
//             // Calculate and log the bounding box for each mesh
//             loadedScene.meshes.forEach(mesh => {
//               const boundingInfo = mesh.getBoundingInfo();
//               const boundingBox = boundingInfo.boundingBox;
//               console.log(`Bounding Box for mesh ${mesh.name}:`, boundingBox);
//             });

//             // Adjust camera to focus on the loaded scene
//             if (scene.activeCamera) {
//               scene.activeCamera.attachControl(canvasRef.current, true);
//             }
//           });
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         multiple
//         accept=".babylon,.gltf,.glb"
//         onChange={handleFileChange}
//       />
//       <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100vh - 40px)' }} />
//     </div>
//   );
// };

// export default BabylonViewer;







// import React, { useRef, useEffect, useState } from 'react';
// import * as BABYLON from '@babylonjs/core';
// import '@babylonjs/loaders';
// import { openDatabase, addScene, getScene } from './database';

// const BabylonViewer = () => {
//   const canvasRef = useRef(null);
//   const [scene, setScene] = useState(null);

//   useEffect(() => {
//     openDatabase().then(() => {
//       const engine = new BABYLON.Engine(canvasRef.current, true);
//       const scene = new BABYLON.Scene(engine);

//       const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
//       camera.setPosition(new BABYLON.Vector3(0, 0, -10));
//       camera.attachControl(canvasRef.current, true);

//       new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

//       engine.runRenderLoop(() => {
//         scene.render();
//       });

//       window.addEventListener('resize', () => {
//         engine.resize();
//       });

//       setScene(scene);

//       return () => {
//         window.removeEventListener('resize', () => {
//           engine.resize();
//         });
//         scene.dispose();
//         engine.dispose();
//       };
//     });
//   }, []);

//   const handleFileChange = (event) => {
//     const files = event.target.files;

//     Array.from(files).forEach(file => {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const data = reader.result;
//         const sceneData = { name: file.name, data: data };
        
//         const sceneId = await addScene(sceneData);
//         console.log(`Scene added with ID: ${sceneId}`);

//         const sceneDataFromDB = await getScene(sceneId);
//         if (sceneDataFromDB) {
//           BABYLON.SceneLoader.Append('', sceneDataFromDB.data, scene, (loadedScene) => {
//             loadedScene.meshes.forEach(mesh => {
//               const boundingInfo = mesh.getBoundingInfo();
//               const boundingBox = boundingInfo.boundingBox;
//               console.log(`Bounding Box for mesh ${mesh.name}:`, boundingBox);
//             });

//             if (scene.activeCamera) {
//               scene.activeCamera.attachControl(canvasRef.current, true);
//             }
//           });
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         multiple
//         accept=".babylon,.gltf,.glb"
//         onChange={handleFileChange}
//       />
//       <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100vh - 40px)' }} />
//     </div>
//   );
// };

// export default BabylonViewer;


      





// lod


import React, { useRef, useEffect, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import { openDatabase, addScene, getScene } from './database';

const BabylonViewer = () => {
  const canvasRef = useRef(null);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    openDatabase().then(() => {
      const engine = new BABYLON.Engine(canvasRef.current, true);
      const scene = new BABYLON.Scene(engine);

      // Camera setup
      const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
      camera.setPosition(new BABYLON.Vector3(0, 0, -10));
      camera.attachControl(canvasRef.current, true);

      // Light setup
      new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

      // Optimizations
      scene.autoClear = false;
      scene.autoClearDepthAndStencil = false;
      scene.blockMaterialDirtyMechanism = true;
      engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });

      setScene(scene);

      return () => {
        window.removeEventListener('resize', () => {
          engine.resize();
        });
        scene.dispose();
        engine.dispose();
      };
    });
  }, []);

  const loadFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    for (const file of files) {
      const data = await loadFile(file);
      const sceneData = { name: file.name, data: data };
      
      const sceneId = await addScene(sceneData);
      console.log(`Scene added with ID: ${sceneId}`);

      const sceneDataFromDB = await getScene(sceneId);
    
      if (sceneDataFromDB) {
        BABYLON.SceneLoader.Append('', sceneDataFromDB.data, scene, (loadedScene) => {
          loadedScene.meshes.forEach(mesh => {
            const boundingInfo = mesh.getBoundingInfo();
            const boundingBox = boundingInfo.boundingBox;
            console.log(`Bounding Box for mesh ${mesh.name}:`, boundingBox);

             
 
            
            // Simplify the mesh for performance
            const simplifiedMesh = mesh.clone(`${mesh.name}_simplified`);
            
            simplifiedMesh.updateFacetData();
            simplifiedMesh.simplify([{ quality: 0.5, distance: 50 }], true, BABYLON.SimplificationType.QUADRATIC);
            mesh.addLODLevel(50, simplifiedMesh);
            mesh.addLODLevel(100, null); // Make the mesh disappear when the distance is 100 units or more
            debugger;
          });

          if (scene.activeCamera) {
            scene.activeCamera.attachControl(canvasRef.current, true);
          }
        });
      }
    }
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




