import ProfileForm from "./ProfileForm";
import BackButton from ".//BackButton";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-0 flex items-center justify-center p-4">
      <div className="bg-gray-0 p-6 sm:p-8 rounded-lg w-full max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
          Mi Perfil
        </h1>
        <ProfileForm />
        <BackButton />
      </div>
    </div>
  );
}
