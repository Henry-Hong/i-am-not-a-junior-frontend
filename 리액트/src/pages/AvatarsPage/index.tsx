import Avatar from "boring-avatars";

export default function AvatarsPage() {
  return (
    <>
      <Avatar name="Margaret Brent" size={88} />
      <Avatar name="Ada Lovelace" size={88} />
      <Avatar
        name="Grace Hopper"
        size={88}
        colors={["#fb6900", "#f63700", "#004853", "#007e80", "#00b9bd"]}
      />
      <Avatar size={88} name="Mary Edwards" colors={["#ff0000", "#0000ff"]} />
    </>
  );
}
