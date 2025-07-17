// "use client";

// import Spline from '@splinetool/react-spline/next';

// export default function Hero() {
//   return (
//     <section className="relative min-h-[600px] w-full overflow-hidden bg-black flex items-center justify-center">
//       {/* <div className="absolute inset-0 z-0 pointer-events-none"> */}
//       <div>
//         <Spline scene="https://prod.spline.design/P00OeEPxnoZEDggJ/scene.splinecode" />
//       </div>
//       {/* Overlay content */}
//       <div className="relative z-10 flex items-center justify-center w-full py-24">
//         <h1 className="text-white text-6xl md:text-8xl font-bold text-center drop-shadow-lg">SceneSwap</h1>
//       </div>
//     </section>
//   );
// } 

"use client";

import Spline from '@splinetool/react-spline';

export default function Hero({ oswaldClass = "" }: { oswaldClass?: string }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">

      {/* Spline background */}
      <div className="absolute inset-0 z-0">
        {/* <Spline scene="https://prod.spline.design/P00OeEPxnoZEDggJ/scene.splinecode" /> */}
        <Spline scene="https://prod.spline.design/DsHFbT8L3fG0n2IX/scene.splinecode" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full py-24">
        <h1 className="text-white text-6xl md:text-8xl font-bold text-center drop-shadow-lg font-primary">
          SceneSwap
        </h1>
        <p className="mt-4 text-white text-xl md:text-2xl text-center font-primary">
          Binge battles? <span className="font-secondary font-normal">Settle here.</span>
        </p>
      </div>
    </section>
  );
}

