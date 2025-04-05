"use client";
import Field from "@/components/profile/Field";
import { useUser } from "@/contexts/UserContext";
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
import { ucfirst } from "@/helpers/string-functions";
import profile from "@/styles/modules/profile.module.scss";
export default function Page() {
  useLimitAccessByRole(["buyer", "seller"]);
  const { user } = useUser();

  return (
    <div className={profile.container}>
      <div className={profile.heading}>Your profile</div>
      <form className={profile.fieldsContainer}>
        <Field
          label="Email:"
          initialValue={user.email}
          name="email"
          editable={true}
          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          patternMessage="The entry should folow the email pattern."
        />
        <Field
          label="Username:"
          initialValue={user.username}
          name="username"
          editable={true}
          pattern="^[^\s]{4,}$"
          patternMessage="The username should be at least 4 characters long."
        />
        <Field
          label="Address:"
          initialValue={user.address}
          name="address"
          editable={true}
          pattern=".{20,}$"
          patternMessage="Address must be at least 20 characters long"
        />
        <Field
          label="Full name:"
          initialValue={user.full_name}
          name="full_name"
          editable={true}
          pattern=".{4}$"
          patternMessage="Full name should be at least 4 characters long."
        />
        {user.role == "buyer" || user.role == "seller" ? (
          <Field
            label={
              user.role == "buyer" ? "Card number:" : "Bank account number:"
            }
            pattern="^(\d{4} \d{4} \d{4} \d{4})$"
            patternMessage="Please follow the credit card pattern"
            initialValue={user.card_number}
            name="card_number"
            editable={true}
          />
        ) : (
          ""
        )}
        <Field
          label="Status:"
          initialValue={ucfirst(user.role)}
          name="role"
          editable={false}
          pattern=""
          patternMessage=""
          // type not needed as the field is read-only
        />
      </form>
    </div>
  );
}
