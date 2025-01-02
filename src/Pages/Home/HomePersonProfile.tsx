interface HomePersonProfileProps {
  img: string;
  name: string;
  role: string;
}

export default function HomePersonProfile({
  img,
  name,
  role,
}: HomePersonProfileProps) {
  return (
    <div>
      <div>
        <img
          style={{
            width: "200px",
            aspectRatio: "1/1",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={img}
          alt=""
        />
      </div>
      <div>
        <h2>{name}</h2>
        <p>{role}</p>
      </div>
    </div>
  );
}
