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
      <div className={profile.fieldsContainer}>
        <Field label="Email: " value={user.email} editable={true} />
        <Field label="Username: " value={user.username} editable={true} />
        <Field label="Address: " value={user.address} editable={true} />
        {user.role == "buyer" || user.role == "seller" ? (
          <Field
            label={
              user.role == "buyer" ? "Card number:" : "Bank account number:"
            }
            value={user.card_number}
            editable={true}
          />
        ) : (
          ""
        )}
        <Field label="Status: " value={ucfirst(user.role)} editable={false} />
      </div>
    </div>
  );
}
