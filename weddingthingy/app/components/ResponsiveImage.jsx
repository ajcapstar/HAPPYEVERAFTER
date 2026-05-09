import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt,
  objectFit = "cover",
  className = "",
  width,
  height,
  style,
  ...props
}) => (
  <Image
    src={src}
    alt={alt}
    width={0}
    height={0}
    sizes="100vw"
    className={className}
    style={{ width: "100%", height: "auto", objectFit, ...style }}
    {...props}
  />
);

export default ResponsiveImage;
