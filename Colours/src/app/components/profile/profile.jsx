import ProfileForm from "./ProfileForm";
import BackButton from "./BackButton";

export default function Profile() {
  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Mi Perfil
      </h1>
      <ProfileForm />
      <BackButton />
    </div>
  );
}
