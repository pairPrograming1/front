import RegisterForm from "./RegisterForm";
import SocialLogin from "./SocialLogin";
import BackButton from "./BackButton";

export default function Register() {
  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Registro
      </h1>
      <RegisterForm />
      <SocialLogin />
      <BackButton />
    </div>
  );
}
