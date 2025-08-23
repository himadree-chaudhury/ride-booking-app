import { RegisterForm } from "@/components/modules/Auth/Register-form";
import Heading from "@/components/modules/common/Heading";

const Register = () => {
  return (
    <div>
      <Heading
        title={"REGISTER"}
        heading={"Create a New Account"}
        description={"Please enter your details to create a new account."}
      />
      <section className="mx-auto max-w-sm">
        <RegisterForm />
      </section>
    </div>
  );
};
export default Register;
