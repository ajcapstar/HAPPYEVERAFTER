import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt,
  objectFit = "cover",
  className = "",
  ...props
}) => (
  <Image
    src={src}
    alt={alt}
    width={0}
    height={0}
    sizes="100vw"
    className={className}
    style={{ objectFit }}
    {...props}
  />
);

export default ResponsiveImage;
