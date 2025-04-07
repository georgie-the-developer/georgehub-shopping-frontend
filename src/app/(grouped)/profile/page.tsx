"use client";
import { useEffect, useState } from "react";
import Field from "@/components/profile/Field";
import { useProfileUpdate } from "@/contexts/ProfileUpdateContext";
import { useUser } from "@/contexts/UserContext";
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
import { ucfirst } from "@/helpers/string-functions";
import profile from "@/styles/modules/profile.module.scss";
import { useAlert } from "@/contexts/AlertContext";
import ButtonForm from "@/components/buttons/ButtonForm";
import { requestConfirmCode } from "@/helpers/request-confirmation-code";

export default function Page() {
  useLimitAccessByRole(["buyer", "seller"]);
  const { user } = useUser();
  const { isEdited, changes } = useProfileUpdate();
  const { showAlert } = useAlert();
  const [codeSent, setCodeSent] = useState<boolean>(false);
  useEffect(() => {
    if (Object.keys(changes).length === 0) {
      setCodeSent(false);
    }
  }, [changes]);

  const sendConfirmationCode = async () => {
    let result: boolean;

    const oldEmailCodeResult = await requestConfirmCode(user.email);

    if (changes["email"]) {
      const newEmailCodeResult = await requestConfirmCode(changes["email"]);
      result = oldEmailCodeResult && newEmailCodeResult;
    } else {
      result = oldEmailCodeResult;
    }

    return result;
  };
  return (
    <div className={profile.container}>
      <div className={profile.heading}>Your profile</div>
      <div className={profile.fieldsContainer}>
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
        {isEdited && !codeSent ? (
          <div className={profile.buttonFormContainer}>
            <ButtonForm
              value="Send confirm code"
              action={async () => {
                const result: boolean = await sendConfirmationCode();
                if (!result) {
                  showAlert("Code sending failed");
                } else {
                  showAlert("Confirmation code sent successfully");
                }
                setCodeSent(result);
              }}
            />
          </div>
        ) : (
          ""
        )}
        {isEdited && codeSent ? (
          changes["email"] ? (
            <>
              <form
                className={profile.confirmContainer}
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  alert(
                    `${e.target["new_email_confirm_code"].value} ${e.target["confirm_code"].value}`
                  );
                }}
              >
                <input
                  type="number"
                  inputMode="numeric"
                  name="new_email_confirm_code"
                  placeholder="Confirmation code (new email)..."
                />
                <input
                  type="number"
                  inputMode="numeric"
                  name="confirm_code"
                  placeholder="Confirmation code (old email)..."
                />
                <input type="submit" value="Confirm changes" />
              </form>
            </>
          ) : (
            <form
              className={profile.confirmContainer}
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                alert(`${e.target["confirm_code"].value}`);
              }}
            >
              <input
                type="number"
                name="confirm_code"
                inputMode="numeric"
                placeholder="Confirmation code..."
              />
              <input type="submit" value="Confirm changes" />
            </form>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
