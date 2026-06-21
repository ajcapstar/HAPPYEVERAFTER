"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./AnimatedTree.css";

export default function AnimatedTree() {
  const treeRef = useRef();

  useGSAP(
    () => {
      const trees = treeRef.current.querySelectorAll(".tree-svg");

      trees.forEach((tree) => {
        const allPaths = tree.querySelectorAll(".tree-path");
        const mainBranches = [];
        const midBranches = [];
        const twigs = [];

        allPaths.forEach((path) => {
          const rawWidth = path.getAttribute("stroke-width") || path.getAttribute("strokeWidth");
          const width = parseInt(rawWidth, 10) || 0;

          if (width >= 10) mainBranches.push(path);
          else if (width >= 6 && width <= 9) midBranches.push(path);
          else if (width >= 3 && width <= 5) twigs.push(path);
        });

        const animateGroup = (paths, delay, duration) => {
          if (!paths.length) return;
          paths.forEach((path) => {
            try {
              const length = path.getTotalLength();
              gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
              gsap.to(path, { strokeDashoffset: 0, opacity: 1, duration, delay, ease: "power3.inOut" });
            } catch (e) {
              console.warn("Error animating path:", e);
            }
          });
        };

        animateGroup(mainBranches, 0, 4.5);
        animateGroup(midBranches, 2.5, 3.5);
        animateGroup(twigs, 5.5, 2.8);
      });
    },
    { scope: treeRef },
  );

  return (
    <div ref={treeRef} className="tree-wrapper">
      {/* Shared Gradient Definition */}
      <svg style={{ width: 0, height: 0, position: "absolute" }}>
        <defs>
          <linearGradient
            id="branch-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#044C38" />
            <stop offset="50%" stopColor="#0B8D5C" />
            <stop offset="100%" stopColor="#52B6FD" />
          </linearGradient>
        </defs>
      </svg>

      {/* Tree Variation 1 */}
      <svg
        className="tree-svg tree-1"
        viewBox="0 0 588 408"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path branch-top"
          data-type="main"
          d="M576.001 6C576.001 57.5 566.501 75.7708 538.501 94C480.501 131.76 424.001 155 395.501 179.5C367.001 204 324.001 197 289.501 222C208.301 302 154.001 306.5 91.501 277C57.901 257 20.501 268.667 6.00098 277"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-mid-top"
          data-type="main"
          d="M581.501 9.5C581.501 50 567.001 76 540.001 95C504.001 120.333 485.603 141.5 479.001 161.5C456.554 229.5 440.501 266.056 433.501 282C418.794 315.5 424.065 332 433.501 348C455.501 378 445.834 396.667 440.501 401.5"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-mid-top-2"
          data-type="main"
          d="M584.501 6.5C574.501 65.3 561.501 89.5 528.501 110C479.001 142 412.501 155 382.001 205C346.001 255 346.501 291 335.501 319.5C319.001 371 302.97 405 289.501 420C258.072 455 202.001 478.518 164.501 487C102.501 501.024 85.001 519 80.5011 546.5C77.501 580.5 97.1677 599.5 110.001 594.5"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-base"
          data-type="mid"
          d="M579.501 7.5C574.001 123 453.334 150.667 424.001 162.5C309.201 202.5 247.834 219.833 231.501 223.5C183.901 234.3 159.668 266.667 153.501 281.5"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* MID BRANCHES - Secondary structure */}
        <path
          className="tree-path branch-top-2"
          data-type="main"
          d="M577 22.5C568.6 62.5 572.001 82 572.001 99.5C572.001 123.5 555.501 145.525 544.501 155C527.001 170.074 503.001 183.5 476.5 196C409.793 227.465 406.001 259 407.001 263.5"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-middle"
          data-type="mid"
          d="M579.501 5C559.101 142.2 453.001 140 398.501 135.5C325.001 129.431 314.001 166.667 305.001 187.5"
          stroke="url(#branch-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-mid-base"
          data-type="mid"
          d="M592.501 7C576.101 47.8 580.001 56 592.501 68.5C617.501 88.5 613.668 103.833 606.001 115.5"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-mid-base-2"
          data-type="mid"
          d="M577.501 10.5C583.101 87.7 471.501 147.667 415.001 168C369.501 184.375 362.501 229 352.501 270.5C338.501 304.5 308.501 331 271.501 343C255.973 348.036 250.001 340.833 252.501 334.5C258.225 320 270.834 319.333 275.001 326.5"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-base-2"
          data-type="mid"
          d="M580.001 6C556.801 101.6 520.501 110.1 490.001 134.5C470.001 150.5 462.001 195.5 462.001 222.5C462.001 290.9 401.668 336 371.501 350"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-base-3"
          data-type="mid"
          d="M587.001 4.5C555.401 70.5 568.001 103.5 587.001 125.5C606.001 147.5 599.251 167 592.501 176C579.001 194 551.001 205 524.001 199.5C504.607 195.549 488.501 213.5 488.501 230C488.501 246.5 501.501 256.5 515.001 256.5C537.501 256.5 542.168 234.833 532.501 227"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* TWIGS - Fine detail */}
        <path
          className="tree-path branch-middle-2"
          data-type="twig"
          d="M575.501 7.5C563.001 81 525.501 96.5 513.501 98.5C498.001 102 491.501 105.5 469.501 96.5C444.501 87.5 446.001 110 456.001 114"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-middle-3"
          data-type="mid"
          d="M571.501 7C578.501 87.5 497.001 78 478.501 66C452.101 52.8 433.501 59.5 423.001 66C407.001 75.5 403.168 67.3333 406.001 61"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="tree-svg tree-2"
        viewBox="0 0 552 441"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES */}
        <path
          className="tree-path branch-mid-top"
          data-type="main"
          d="M543.186 216.297C431.986 197.497 402.186 216.297 384.686 238.797C359.486 276.397 357.248 292.797 353.186 313.297C344.786 355.697 325.686 365.613 313.186 374.797C293.586 389.197 277.186 385.797 259.186 385.797C230.386 385.797 223.186 400.297 210.186 410.297C166.637 443.797 136.186 438.297 105.686 420.797C73.6861 398.297 19.1862 349.797 6.6863 385.797C3.04059 396.297 15.0196 410.297 19.1862 410.297"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-middle"
          data-type="main"
          d="M542.686 211.297C471.086 204.897 417.186 149.297 402.686 133.297C361.686 97.7968 318.186 121.297 295.686 133.297C224.186 177.797 159.284 259.297 200.186 327.297C231.686 374.797 210.186 399.797 195.186 402.797"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* MID BRANCHES */}
        <path
          className="tree-path branch-top"
          data-type="main"
          d="M545.186 221.297C498.386 231.697 486.992 262.059 480.686 284.297C471.186 317.797 464.186 345.797 435.686 369.797C380.686 414.297 360.519 388.63 356.686 374.797C351.144 354.797 370.686 339.797 377.686 341.297"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-mid-base"
          data-type="mid"
          d="M545.505 204.501C487.505 199.001 476.505 173.001 476.505 156.501C476.505 140.001 486.005 120.501 478.505 110.501"
          stroke="url(#branch-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* TWIGS */}
        <path
          className="tree-path branch-base"
          data-type="mid"
          d="M547.505 208.001C451.105 198.001 410.838 142.334 408.005 122.001C404.313 95.5005 407.338 69.6672 414.505 52.0005C425.66 24.5005 415.005 9.00052 404.505 3.00052"
          stroke="url(#branch-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="tree-svg tree-3"
        viewBox="0 0 392 409"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES */}
        <path
          className="tree-path branch-top"
          data-type="main"
          d="M385.501 401.874C362.701 329.074 350.151 335.825 338.001 311.874C320.501 277.374 326.501 241.318 310.501 216.874C281.701 172.874 222.001 162.839 176.001 169.374C84.5015 182.374 28.5015 165.874 6.00146 118.374"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-mid-base"
          data-type="main"
          d="M380.501 402.874C383.001 342.874 367.835 339.707 361.001 335.874C308.201 315.474 291.001 301.374 291.001 266.874C308.001 153.874 275.001 132.874 228.001 137.374C200.001 140.055 186.077 143.525 162.501 145.374C111.501 149.374 96.0014 119.207 89.0014 96.374C81.5014 64.374 53.168 61.5407 37.5013 57.874C-0.998541 48.8634 13.0013 23.7073 20.0013 17.374C32.0015 6.51681 47.5015 2.87405 68.5014 8.87399"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* MID BRANCHES */}
        <path
          className="tree-path branch-mid-top"
          data-type="mid"
          d="M382.001 403.874C382.001 322.374 291.001 251.374 248.501 221.874C215.984 199.303 194.001 170.374 189.001 144.874"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* TWIGS */}
        <path
          className="tree-path branch-middle"
          data-type="twig"
          d="M376.002 403.874C367.602 338.674 349.668 302.041 342.501 293.874C337.701 287.874 335.501 275.541 336.001 270.374C336.001 240.374 319.835 218.374 311.501 210.374C294.301 189.974 297.048 171.874 301.001 166.874C308.908 156.874 317.668 166.374 320.001 172.874"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path branch-base"
          data-type="twig"
          d="M377.501 404.874C361.901 339.674 339.002 297.374 330.002 285.374C299.202 247.774 275.501 232.35 267.002 225.874C250.202 213.074 252.002 187.207 255.002 175.874C264.501 148.874 237.335 148.374 230.001 147.374"
          stroke="url(#branch-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="tree-svg tree-4"
        viewBox="0 0 400 502"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path"
          data-type="mid"
          d="M293.171 497.001C255.971 407.801 267.671 393.001 293.171 380.001C337.171 355.201 371.504 338.668 383.171 333.501C442.171 302.501 461.165 276.501 466.671 250.501C473.871 216.501 465.171 200.501 453.671 185.001C440.071 168.601 442.171 150.501 442.171 139.001C442.171 109.001 425.504 93.168 417.171 89.0013"
          stroke="url(#branch-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M291.171 499.001C286.371 447.001 238.504 413.001 215.17 402.501C190.771 391.301 196.337 365.835 202.171 354.501C221.171 320.501 236.171 316.501 244.171 304.501C253.371 292.101 243.337 289.335 237.171 289.501"
          stroke="url(#branch-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M284.671 498.501C257.071 418.101 216.171 434.001 181.171 434.001C155.171 434.001 132.312 419.178 124.171 409.001C108.171 389.001 85.8372 395.668 83.6705 401.501"
          stroke="url(#branch-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M285.671 500.001C262.071 429.601 212.671 406.101 194.171 395.001C166.171 378.201 184.837 333.668 197.671 313.501C234.471 254.701 227.958 223.001 215.671 195.501C205.171 172.001 186.671 163.001 178.171 150.501C166.571 136.501 173.337 128.001 178.171 125.501"
          stroke="url(#branch-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M287.17 494.001C272.77 446.801 287.17 415.501 328.67 394.501C400.67 367.501 405.956 335.501 409.67 316.001C416.07 282.401 398.67 253.335 389.17 243.001"
          stroke="url(#branch-gradient)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M286.171 495.501C247.171 396.001 139.38 374.616 114.171 364.001C-56.8295 292.001 52.3372 152.668 124.671 108.501C192.271 56.5013 159.504 18.5013 134.671 6.00131"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* MID BRANCHES - Structure */}
        <path
          className="tree-path"
          data-type="main"
          d="M277.171 476.001C252.371 412.001 275.67 385.501 303.671 371.501C358.171 341.001 342.337 296.668 328.171 287.501C302.171 274.001 300.337 300.835 303.671 307.501C309.671 319.501 321.837 317.168 323.671 307.501"
          stroke="url(#branch-gradient)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* TWIGS - Fine detail */}
        <path
          className="tree-path"
          data-type="twig"
          d="M285.671 499.001C259.671 415.801 198.171 386.001 170.671 381.501C110.671 365.901 94.1761 334.501 90.6706 320.001C81.8706 283.601 106.004 265.501 119.171 261.001C158.171 253.001 156.171 296.501 130.671 309.001C117.071 317.801 109.171 311.001 109.171 303.501C109.171 292.501 120.504 285.501 126.171 288.501"
          stroke="url(#branch-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M294.171 498.001C294.971 468.001 307.171 460.301 319.171 455.501C329.171 451.501 342.671 445.858 333.671 442.001C319.67 436.001 329.005 426.668 333.671 424.001C340.671 420.001 346.171 423.001 349.671 427.501"
          stroke="url(#branch-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M285.171 499.501C223.571 397.101 155.171 370.566 128.171 362.501C89.6706 351.001 61.7 354.001 52.1706 367.501C32.9706 394.701 13.6706 390.814 7.17061 383.501C-0.829396 374.501 0.670532 360.501 10.1706 356.001C11.6167 355.316 16.1706 354.501 19.1706 356.001C10.1706 344.751 11.7276 337.501 14.2276 335.001C22.2276 326.001 35.2276 332.186 39.7276 340.001C47.3276 353.201 37.6706 358.001 32.1706 358.001C27.6177 358.001 24.8373 354.501 24.1706 352.001"
          stroke="url(#branch-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="tree-svg tree-5"
        viewBox="0 0 336 476"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path"
          data-type="main"
          d="M121.093 463.523C122.293 409.523 101.593 375.023 91.0931 364.523C13.0931 277.323 46.5931 228.856 73.0931 215.523C99.5931 202.19 132.593 201.023 139.593 152.523"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M121.593 467.523C129.193 395.923 153.953 384.697 177.593 379.023C252.593 361.023 280.593 305.023 288.593 267.523C296.593 244.023 294.593 191.19 288.593 175.023C275.393 126.223 295.426 121.69 307.093 125.523C322.093 133.523 312.426 148.856 303.593 150.023"
          stroke="url(#branch-gradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M115.593 469.023C115.593 381.023 167.926 331.69 194.093 318.023C274.093 276.423 267.791 230.523 260.593 171.023C254.593 121.423 284.426 98.023 300.093 92.523C323.093 81.0229 332.678 62.9824 331.593 48.523C328.593 8.52295 354.926 5.68964 366.593 6.02298"
          stroke="url(#branch-gradient)"
          strokeWidth="19"
          strokeLinecap="round"
        />

        {/* MID BRANCHES - Structure */}
        <path
          className="tree-path"
          data-type="twig"
          d="M122.093 467.023C129.293 426.223 156.093 408.023 168.593 404.023C197.793 394.823 218.76 385.856 225.593 382.523"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M116.593 468.523C121.593 390.023 90.5931 372.523 75.5931 366.023C42.0931 354.023 18.5931 344.023 8.59311 330.523C-7.40692 305.523 12.0931 291.489 21.5931 290.523C38.0931 288.845 39.4265 308.856 33.5931 319.523"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* TWIGS - Fine detail */}
        <path
          className="tree-path"
          data-type="twig"
          d="M125.093 467.023C139.093 431.023 151.093 424.523 170.593 421.023C170.593 421.023 204.593 410.895 215.593 412.023C246.793 415.223 260.26 409.023 263.093 405.523C272.693 395.523 273.593 386.943 269.093 383.523C259.093 375.923 255.593 382.023 255.093 386.023C255.093 398.823 267.426 397.69 273.593 395.523C286.093 390.023 283.76 374.69 281.593 371.023C275.979 361.523 264.593 360.023 263.093 350.523"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M111.593 468.523C112.393 432.123 102.093 425.023 97.0931 420.023C91.593 414.523 81.5931 411.958 75.5931 413.523C64.0931 416.523 55.3023 409.023 57.0931 402.023C59.0931 390.523 69.9264 390.856 73.5931 396.023C77.0931 402.023 70.2598 405.356 67.5931 404.523"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M117.593 467.023C117.193 399.423 100.426 361.523 92.0931 351.023C77.4106 332.523 77.5931 316.023 89.0931 307.523C100.593 299.023 122.688 299.884 125.593 316.023C128.498 332.161 121.593 336.748 115.093 339.023C105.093 342.523 98.0931 331.023 98.5931 325.023"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M107.593 468.523C117.993 408.923 99.0931 393.023 90.5931 384.023C57.5931 355.523 39.093 362.356 36.593 371.023C34.0931 379.69 40.9264 382.523 43.093 380.023"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="tree-svg tree-6"
        viewBox="0 0 404 474"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path"
          data-type="mid"
          d="M109.5 494.626C125.5 453.026 94.3096 436.126 75.5002 394.626C50.3002 339.026 80.6669 307.459 99.0002 298.626C132 282.726 200.667 255.792 205 252.126C275 223.626 257.5 176.197 225 165.126C203 157.631 176.5 172.292 175 183.626"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M115.5 493.126C136 422.126 124.199 386.126 84.0003 343.626C-46.9997 205.126 25.5003 139.126 84.0003 126.626C125.5 117.758 159.5 107.626 166 85.6256"
          stroke="url(#branch-gradient)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M115.5 494.626C115.5 430.626 155.167 380.292 175 363.126C295.8 269.526 315.229 248.126 344.5 203.626C403.7 113.626 390.5 57.1256 354.5 21.1256C337.499 4.12398 288 -5.3744 269 30.6256"
          stroke="url(#branch-gradient)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* MID BRANCHES - Structure */}
        <path
          className="tree-path"
          data-type="mid"
          d="M117 495.126C117 395.126 145.426 391.109 163 395.126C180.5 399.126 194 397.626 204.5 394.126C224.464 387.471 232 379.626 230.5 367.126"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M111.5 492.626C119.5 430.626 119 404.626 96.0002 370.626C58.5547 315.271 63.7987 278.126 77.5002 261.126C104.5 227.626 137.5 250.792 151.5 258.126C164.5 264.935 171.5 266.588 181 261.126C202.5 248.763 211.167 252.626 213.5 258.126"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />{" "}
        <path
          className="tree-path"
          data-type="mid"
          d="M121 498.126C123 477.626 129 467.626 140 458.126C146.369 452.626 150.5 446.864 155.5 446.626C166 446.126 167.269 453.126 166.5 457.126C164 465.626 154 470.126 149 464.126C147.41 462.217 147.667 458.292 148 457.126"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M110 496.126C111.2 456.126 95.0002 439.857 86.0002 436.126C69.6003 429.326 64.5002 434.06 56.0002 438.126C37.6002 446.926 27.3336 444.459 24.5002 442.126"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* TWIGS - Fine detail */}
        <path
          className="tree-path"
          data-type="twig"
          d="M119.5 495.126C130.3 453.526 144 448.126 152.5 449.626C159 450.773 165 454.126 172 449.626C182.038 443.173 176 434.626 174 430.126C170.8 422.926 172.667 421.459 174 421.626"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M113.5 495.126C115.9 437.526 96.5003 411.459 86.5003 405.626C59.3003 396.426 49.8336 391.792 48.5003 390.626C40.5003 383.026 42.1669 377.459 44.0003 375.626C49.5002 371.126 52.3336 377.626 52.5002 380.626C53.7002 391.426 42.6669 391.792 37.0002 390.626C25.5002 388.258 8.00024 378.126 17.5002 365.626C25.5002 357.126 26.5002 349.626 19.0002 352.126C8.50024 356.626 4.83358 355.459 2.00024 353.626"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="tree-svg tree-7"
        viewBox="0 0 636 194"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path"
          data-type="main"
          d="M11.0002 466.501C6.20015 399.301 34.0002 375.001 80.5002 360.501C131.5 344.598 143.966 309.642 152.5 291.001C171.5 249.501 143.304 230.501 124.5 203.501C105.697 176.501 118 163.168 124.5 157.001"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M14.5002 468.001C14.5002 408.801 34.0002 388.001 55.0002 377.501C73.0002 368.501 89.5002 359.191 119 345.001C158.5 326.001 166.5 307.168 174.5 291.501C206.67 228.501 195.5 196.865 232.5 156.501C269.5 116.138 289.342 99.5015 312 58.5015C322.5 39.5015 336 35.5154 347.5 32.0015C359 28.4876 379 19.5015 373 6.0015"
          stroke="url(#branch-gradient)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M9.00016 466.001C15.4002 374.801 55.5002 337.501 90.0002 323.001L203.5 276.501C245.5 263.001 287.5 234.501 300 196.501C309 160.001 329.5 145.501 358.5 132.001C412.5 114.001 396.667 77.3348 388.5 68.5015C372.9 53.3015 378 45.5015 382.5 43.5015"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M6.00016 464.001C10.0002 390.001 51.6668 346.168 72.0002 333.501C113.5 310.001 98.4069 281.001 94.0002 261.001C88.8002 237.401 108.333 238.335 117 244.001C127 250.54 122.5 263.168 121.5 267.001"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* MID BRANCHES - Structure */}
        <path
          className="tree-path"
          data-type="mid"
          d="M9.00016 465.002C23.8002 357.402 72.0002 329.554 98.0002 317.002C141.5 296.002 173 293.85 196.5 303.502C224.5 315.002 263 299.002 270 290.002C310 249.502 325.5 303.502 294.5 317.002"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* TWIGS - Fine detail */}
        <path
          className="tree-path"
          data-type="twig"
          d="M12.0002 462.501C24.0002 406.501 33.0002 378.001 24.5002 349.001C17.6122 325.501 16.0002 296.835 24.5002 288.001"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M9.00016 466.502C29.4002 396.502 45.5002 387.032 59.0002 384.002C78.6002 379.602 86.0002 390.001 86.0002 395.502C86.0002 406.302 79.3335 406.668 76.0002 405.502C65.0002 399.001 79.1668 386.502 86.0002 381.002C96.5002 372.55 100.333 386.668 99.5002 393.002"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M14.0002 465.501C24.8002 415.901 50.5002 411.501 70.0002 416.001C114.5 424.001 128.5 416.835 139.5 409.501C167 388.001 155.833 366.168 144.5 362.001C127 357.001 123.816 379.607 134 383.001C144.185 386.396 145.333 380.001 144.5 376.501"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="tree-svg tree-8"
        viewBox="0 0 636 288"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path"
          data-type="main"
          d="M6.00004 119.535C130.8 116.335 164 116.035 208 104.035C302.5 71.0349 338.557 104.535 345.5 140.535C348.875 158.035 357.833 168.535 364 167.535"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M7.50004 122.035C153.1 112.835 168 114.535 185 124.535C235 157.735 250.41 164.7 272.5 180.535C329 221.035 435.5 227.535 494.5 221.035C563 209.035 599 186.535 621.5 134.535C639.836 92.1581 622.333 53.0349 614 42.0349"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M7.50004 124.035C73.5 129.535 92 132.375 114.5 148.535C186.9 200.535 210 205.035 240 211.035C270 217.035 298 215.535 320.5 211.035C373.5 190.035 386 193.035 400.5 203.035"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* MID BRANCHES - Structure */}
        <path
          className="tree-path"
          data-type="twig"
          d="M6.50004 127.035C74.5 129.835 88 147.035 90.5 158.035C94.5 171.235 103.167 176.535 107 177.535C116.6 179.535 115 184.035 115 189.535C114.5 207.035 137 201.202 143.5 196.035H144"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M6.50004 114.535C69.3 114.535 68.5 109.655 83 101.535C95.5 94.5349 102 77.5349 102 67.5349C102 37.0349 120.333 29.3683 131 30.5349C146.5 34.0349 136 47.0349 123 43.0349"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M5.50004 116.535C80 125.035 114.5 117.035 141.5 91.035C176 57.8128 169.5 36.035 169.5 23.0349C169.5 10.0349 179 0.0348572 195.5 3.03491"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* TWIGS - Fine detail */}
        <path
          className="tree-path"
          data-type="twig"
          d="M7.50004 125.535C93.9 127.935 107 143.535 131 159.035C159.8 179.435 162.5 202.035 162.5 212.035C162.5 245.235 186.167 254.868 198 255.535"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M6.50004 112.035C57 121.535 68 103.535 73 97.5349C86.6 76.3349 80 63.5349 76.5 55.0349"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="tree-svg tree-9"
        viewBox="0 0 447 369"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path"
          data-type="mid"
          d="M7.0818 4.50118C38.6818 81.7012 63.2485 109.335 71.5818 113.501C171.182 178.701 189.493 207.001 192.582 233.001C197.382 273.401 216.082 291.001 227.082 303.001C238.082 315.001 237.582 343.001 227.082 370.001C208.682 438.401 229.748 496.501 242.582 517.001C274.182 567.801 306.415 551.835 318.582 537.501C356.982 496.301 340.915 431.335 328.082 404.001"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M10.0818 7.50118C22.0818 84.3012 50.7485 105.835 63.5818 107.001C137.582 151.801 165.748 193.335 170.582 208.501C198.182 286.501 256.082 315.335 281.582 320.001C346.082 331.805 370.582 356.335 379.082 372.001C400.082 417.001 427.582 447.001 433.082 456.001C452.082 476.001 467.082 475.001 491.582 486.001C516.082 497.001 539.248 513.668 544.082 521.501C585.282 563.501 656.915 552.001 687.582 541.001C723.082 528.267 747.582 532.869 775.582 535.501C822.382 539.901 849.082 507.335 856.582 490.501C870.982 454.501 894.582 442.471 924.082 438.001C959.582 432.622 1027.08 451.501 1080.58 446.001C1161.08 443.501 1189.08 361.168 1192.08 330.001C1196.58 304.001 1222.58 304.501 1238.58 306.501C1254.58 306.501 1254.08 292.001 1247.58 284.001"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M15.5818 10.0012C27.9818 111.601 118.082 145.668 161.582 150.001C318.582 157.001 351.582 243.001 345.582 282.501C341.253 311.001 311.93 306.501 305.082 289.001C296.082 266.001 307.415 257.001 318.582 256.501"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M10.5818 8.50118C18.1818 73.3012 37.5818 88.0012 66.5818 110.001C149.082 155.501 162.754 190.501 176.082 218.501C223.682 318.501 309.915 357.501 347.082 364.501C377.082 370.151 438.582 389.001 463.582 416.501C518.382 469.701 550.082 474.001 596.082 474.001C626.082 470.501 730.426 474.001 745.082 440.501C755.582 416.501 704.082 378.001 682.582 416.501"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M10.0818 7.50118C22.0818 84.3012 50.7485 105.835 63.5818 107.001C137.582 151.801 165.748 193.335 170.582 208.501C198.182 286.501 256.082 315.335 281.582 320.001C339.182 324.001 370.582 356.335 379.082 372.001C395.882 397.601 398.082 406.501 399.082 430.501C395.082 464.501 407.582 478.501 435.582 487.001C470.082 496.001 479.082 513.001 480.082 534.001"
          stroke="url(#branch-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* MID BRANCHES - Structure */}
        <path
          className="tree-path"
          data-type="mid"
          d="M4.5818 9.00118C-1.8182 50.6012 46.2485 97.0012 71.0818 115.001C105.882 132.201 101.582 163.501 101.582 179.001C101.582 222.201 169.248 242.001 203.082 246.501C281.082 256.876 293.082 281.835 291.082 299.501"
          stroke="url(#branch-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M9.0818 8.50118C22.6818 68.5012 67.0818 109.501 87.5818 122.501C131.982 160.101 138.33 174.001 137.082 191.001C133.882 234.601 144.082 253.91 151.582 263.001C168.082 283.001 194.915 286.335 199.082 283.001"
          stroke="url(#branch-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M10.0818 7.50118C22.0818 84.3012 50.7485 105.835 63.5818 107.001C137.582 151.801 165.748 193.335 170.582 208.501C206.982 288.901 250.748 326.668 268.082 335.501C289.582 342.501 283.248 362.001 281.582 366.001C271.582 390.001 297.248 403.001 307.082 405.001C334.582 410.594 330.248 431.335 327.582 435.001"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* TWIGS - Fine detail */}
        <path
          className="tree-path"
          data-type="twig"
          d="M4.08181 8.00118C0.881806 46.0012 4.08181 51.0012 19.0818 65.0012C40.0818 88.5012 15.9151 107.501 7.5818 116.001"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M12.5818 8.50118C30.1818 88.9012 65.2485 106.335 80.5818 105.001C97.5818 102.001 108.582 112.474 128.582 99.5012C147.082 87.5012 160.082 96.0012 162.582 107.501"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M8.0818 10.0012C22.0818 47.0012 12.4151 57.1679 19.5818 63.0012C47.1818 107.801 48.6669 133.001 47.5818 141.501C44.5818 165.001 29.2485 169.501 24.5818 165.001C14.73 155.501 24.4151 147.168 30.0818 148.001C44.0818 151.201 41.5818 163.001 38.5818 168.501C27.3818 189.301 25.9151 200.835 26.5818 204.001C27.7818 216.401 33.0818 221.001 38.5818 218.501C47.3818 211.301 41.0818 205.175 37.0818 205.001C18.6818 204.201 19.5818 216.501 19.5818 226.001C18.9489 250.001 34.7485 243.168 37.0818 240.501C42.5818 230.501 34.0818 226.001 30.0818 226.001C13.6818 226.001 15.0818 245.501 22.5818 258.001C30.0818 270.501 30.0818 277.121 24.5818 278.001C14.5818 279.601 17.0818 271.001 19.5818 266.501"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M11.0818 11.0012C22.5818 62.0012 49.0818 74.5012 66.0818 78.5012C86.0818 83.2071 95.5818 74.0012 95.5818 62.0012C92.5818 39.0012 68.9151 43.0012 66.0818 53.5012"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M17.0818 9.50118C33.0818 77.5012 61.1148 76.0743 66.0818 75.5012C79.0818 74.0012 82.9818 74.0012 88.5818 70.5012C112.582 55.5012 118.582 75.0012 112.582 81.0012C104.182 89.4012 101.415 80.8345 101.082 75.5012"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          className="tree-path"
          data-type="twig"
          d="M66.4179 133.754L63.5506 135.761L63.6975 135.971L63.8734 136.157L66.4179 133.754ZM69.1743 158.439C68.4481 160.23 69.3116 162.271 71.103 162.997C72.8943 163.723 74.9353 162.86 75.6615 161.069L72.4179 159.754L69.1743 158.439ZM3.41792 0.753556L-1.19209e-06 1.50711C7.15443 33.9576 21.1093 55.059 34.3494 71.9734C41.0628 80.55 47.2177 87.6064 52.5597 94.8669C57.8056 101.997 61.8531 108.807 64.0627 116.25L67.4179 115.254L70.7732 114.257C68.2327 105.7 63.6552 98.1355 58.198 90.7184C52.8369 83.432 46.2105 75.7697 39.8615 67.6587C26.9766 51.1981 13.6814 31.0496 6.83583 -1.19209e-07L3.41792 0.753556ZM67.4179 115.254L64.0627 116.25C64.9808 119.342 64.2365 121.765 63.2394 124.685C62.3676 127.239 60.6194 131.573 63.5506 135.761L66.4179 133.754L69.2852 131.746C68.7164 130.934 68.7299 130.268 69.864 126.947C70.8728 123.992 72.3785 119.665 70.7732 114.257L67.4179 115.254ZM66.4179 133.754L63.8734 136.157C71.3419 144.065 71.2114 153.414 69.1743 158.439L72.4179 159.754L75.6615 161.069C78.6244 153.76 78.494 141.443 68.9625 131.35L66.4179 133.754Z"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="tree-svg tree-10"
        viewBox="0 0 309 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MAIN BRANCHES - Foundation */}
        <path
          className="tree-path"
          data-type="main"
          d="M79.5381 5.50084C90.3381 71.5008 130.371 107.334 149.038 117.001C185.038 145.401 186.589 178.001 199.038 201.501C238.238 275.501 297.371 301.001 322.038 304.501C374.438 312.501 406.871 316.168 416.538 317.001C437.038 318.768 515.038 336.501 545.538 323.001C619.538 297.501 672.371 249.501 682.038 233.501C732.038 174.301 796.538 151.168 822.538 147.001C859.538 141.071 881.538 129.841 895.538 122.001C935.538 99.6008 923.871 133.668 913.038 153.501"
          stroke="url(#branch-gradient)"
          strokeWidth="17"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M73.5381 7.50084C95.5381 62.3008 105.538 76.1889 120.538 90.5008C164.138 132.101 186.038 146.501 191.538 148.501C244.038 174.501 263.038 183.501 277.038 209.001C287.438 232.601 284.038 248.501 284.038 253.501C279.638 282.301 281.538 286.001 288.038 296.501C321.038 335.001 362.371 359.334 369.538 363.001"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M74.0381 6.50084C85.5381 55.0008 110.538 83.0008 140.538 108.001C183.58 143.869 191.417 174.001 199.038 191.001C212.038 220.001 237.038 247.501 252.038 269.501C279.038 303.001 293.038 313.501 332.038 300.501C362.438 285.701 395.705 260.668 408.538 250.001C441.038 222.988 454.538 223.001 479.538 250.001"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* MID BRANCHES - Structure */}
        <path
          className="tree-path"
          data-type="twig"
          d="M73.5381 7.50084C79.5381 57.5008 97.0381 63.0008 122.538 94.5008C144.038 114.501 136.038 142.668 129.538 145.001"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M70.538 7.50084C72.938 43.1008 55.0381 52.2385 37.538 64.0008C13.138 80.4008 17.7047 104.501 23.038 114.501"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="main"
          d="M68.0382 8.50084C78.0382 44.1008 65.2048 70.6675 57.5382 79.5008C35.0382 111.501 48.0381 134.001 59.5382 148.001C68.4302 158.826 81.5381 167.455 100.538 164.001C125.538 159.455 127.205 166.501 128.038 172.001"
          stroke="url(#branch-gradient)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="mid"
          d="M77.0381 10.5008C91.8381 48.1008 103.038 55.5008 118.038 57.5008C150.749 61.8622 162.26 85.5008 164.538 97.0008C172.938 139.401 163.607 156.001 158.538 179.501C147.538 230.501 166.602 266.501 170.038 276.001C178.538 299.501 188.038 314.001 203.538 325.001"
          stroke="url(#branch-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* TWIGS - Fine detail */}
        <path
          className="tree-path"
          data-type="twig"
          d="M69.5381 7.00084C82.7381 47.4008 72.5381 98.0008 48.5381 109.501C13.5381 122.001 16.5381 155.668 24.0381 168.501C42.5381 201.501 29.0381 231.001 17.0381 232.001C0.0380554 232.001 0.0380747 217.501 4.53808 214.001C10.0381 209.001 17.0381 215.834 17.0381 219.501"
          stroke="url(#branch-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M79.0381 5.00084C81.0381 26.0008 130.038 55.5008 145.538 44.0008C154.038 37.6944 143.871 28.8342 138.038 28.5008C124.838 28.5008 127.871 38.8342 131.038 44.0008C142.638 56.8008 155.538 60.5008 163.038 63.0008C170.538 65.5008 191.871 70.1675 197.038 69.5008C213.038 66.3008 214.038 55.5008 212.538 50.5008C208.538 40.0008 198.205 45.8342 197.038 48.0008C189.838 57.6008 193.038 72.5008 211.038 69.5008C234.038 66.5008 250.72 71.5008 254.538 85.5008C262.311 114.001 240.705 125.001 228.538 125.501C206.538 123.501 209.038 104.501 214.538 98.5008C220.038 92.5008 232.329 95.1305 235.038 101.001C238.038 107.501 232.538 111.834 228.538 112.001"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="tree-path"
          data-type="twig"
          d="M71.0381 5.50084C71.4381 30.3008 74.8714 51.5008 76.5381 59.0008C81.5381 75.5008 76.0381 96.5008 71.0381 103.001C61.4381 118.601 75.3714 133.501 83.5381 139.001"
          stroke="url(#branch-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
