import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  objectFit = "cover",
  className = "",
  ...props
}) => {
  // "unset" means: don't add an inline style for this dimension —
  // let the CSS class on the element control it instead.
  const style = { objectFit };
  if (width !== "unset") style.width = width;
  if (height !== "unset") style.height = height;

  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={className}
      style={style}
      {...props}
    />
  );
};

export default ResponsiveImage;
