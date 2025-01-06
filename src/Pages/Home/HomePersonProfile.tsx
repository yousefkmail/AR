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
    <div className="m-sm">
      <img className="home_team-member_img" src={img} alt="Image" />
      <div>
        <h2>{name}</h2>
        <p>{role}</p>
      </div>
    </div>
  );
}
