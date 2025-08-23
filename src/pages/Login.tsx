import { LoginForm } from "@/components/modules/Auth/Login-form";
import Heading from "@/components/modules/common/Heading";

const Login = () => {
  return (
    <div>
      <Heading
        title={"LOGIN"}
        heading={"Welcome Back"}
        description={"Please enter your credentials to access your account."}
      />
      <section className="max-w-sm mx-auto">
        <LoginForm />
      </section>
    </div>
  );
};
export default Login;
