import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  className = "",
}) => (
  <Image
    src={src}
    alt={alt}
    width={0}
    height={0}
    sizes="100vw"
    className={className}
    style={{ width, height, objectFit: "cover" }}
  />
);

export default ResponsiveImage;
