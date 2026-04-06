import Image from "next/image";

const ResponsiveImage = ({ src, alt, height = "400px", width = "100%", className = "" }) => (
  <div
    className={className}
    style={{ position: "relative", width, height }}
  >
    <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
  </div>
);

export default ResponsiveImage;
