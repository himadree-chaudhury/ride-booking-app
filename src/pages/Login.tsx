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
      <LoginForm />
    </div>
  );
};
export default Login;
