"use client";
import { useEffect, useState, useTransition } from "react";
import Field from "@/components/profile/Field";
import { useProfileUpdate } from "@/contexts/ProfileUpdateContext";
import { useUser } from "@/contexts/UserContext";
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
import { ucfirst } from "@/helpers/string-functions";
import profile from "@/styles/modules/profile.module.scss";
import { useAlert } from "@/contexts/AlertContext";
import ButtonForm from "@/components/buttons/ButtonForm";
import ButtonLink from "@/components/buttons/ButtonLink";
import { requestConfirmCode } from "@/helpers/request-confirmation-code";
import config from "config.json";
import * as Form from "@/components/form/Form";
import ModalWindow from "@/components/ModalWindow";
export default function Page() {
  useLimitAccessByRole(["buyer", "seller"]);
  const { user, login, logout } = useUser();
  const { isEdited, changes, setChanges } = useProfileUpdate();
  const { showAlert } = useAlert();
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [passwordFieldOpen, setPasswordFieldOpen] = useState<boolean>(false);
  const [confirmDeleteFieldOpen, setConfirmDeleteFieldOpen] =
    useState<boolean>(false);
  useEffect(() => {
    if (Object.keys(changes).length === 0) {
      setCodeSent(false);
    }
  }, [changes]);

  // a function that simplyfies the confirm code sending, an additional level of abstraction
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

  // Handle profile updates (not including user's password)
  const handleProfileUpdateSubmit = async (e: React.FormEvent) => {
    startTransition(async () => {
      try {
        e.preventDefault();
        const confirmCode = e.target["confirm_code"].value;
        const newEmailConfirmCode =
          e.target["new_email_confirm_code"].value || ""; // "" if email not updated
        const result = await fetchUptadeProfile(
          confirmCode,
          newEmailConfirmCode,
          changes
        );
        if (!result) {
          showAlert("Your confirmation code might be invalid or expired");
        } else {
          showAlert("Profile updated successfully!");
          setChanges({});
          setCodeSent(false);
          login();
        }
      } catch (e) {
        showAlert("Fetch error");
        console.error(e);
      }
    });
  };
  const fetchUptadeProfile = async (
    confirmCode: string,
    newEmailConfirmCode: string,
    changes: {}
  ) => {
    const data = {
      ...changes,
      confirmation_code: confirmCode,
      new_email_confirmation_code: newEmailConfirmCode,
    };
    const url = config.API_URL + "auth/me";
    const res = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  };

  // Password changing
  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFieldOpen(false);
    const result = await fetchChangePassword(
      user.email,
      e.target["new_password"].value,
      e.target["confirm_code"].value
    );
    if (!result) {
      showAlert("Something went wrong with password change");
    } else {
      showAlert("Password changed successfully");
    }
  };
  const fetchChangePassword = async (
    email: string,
    newPassword: string,
    confirmCode: string
  ) => {
    const data = {
      email: email,
      confirmation_code: confirmCode,
      new_password: newPassword,
    };
    let url = config.API_URL + "auth/reset-password";
    let res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  };

  // Account deletion
  const handleDeleteAccountSubmit = async (e: React.FormEvent) => {
    startTransition(async () => {
      e.preventDefault();
      const result = await fetchDeleteAccount(e.target["confirm_code"].value);
      if (!result) {
        showAlert("Failed to delete account");
      } else {
        showAlert("Account deleted successfully");
        logout();
        window.location.href = "/welcome";
      }
      setConfirmDeleteFieldOpen(false);
    });
  };
  const fetchDeleteAccount = async (confirmCode: string) => {
    const url = config.API_URL + "auth/delete-account";
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmation_code: confirmCode }),
    });
    return res.ok;
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
        {user.role == "seller" ? (
          <Field
            label="Support email:"
            initialValue={user.support_email}
            name="support_email"
            editable={true}
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            patternMessage="The entry should folow the email pattern."
          />
        ) : (
          ""
        )}

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
        <div className={profile.roleContainer}>
          <Field
            label="Status:"
            initialValue={ucfirst(user.role)}
            name="role"
            editable={false}
            pattern=""
            patternMessage=""
            // type not needed as the field is read-only
          />
          {user.role == "buyer" ? (
            <ButtonLink
              link="/upgrade-to-seller"
              text="Update to seller"
              type="secondary"
            />
          ) : (
            ""
          )}
        </div>
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
                onSubmit={handleProfileUpdateSubmit}
              >
                <input
                  type="number"
                  inputMode="numeric"
                  name="new_email_confirm_code"
                  placeholder="Confirmation code (new email)..."
                  required
                />
                <input
                  type="number"
                  inputMode="numeric"
                  name="confirm_code"
                  placeholder="Confirmation code (current email)..."
                  required
                />
                <div
                  className={`${profile.submitContainer} ${
                    isPending ? profile.pending : ""
                  }`}
                >
                  <input
                    type="submit"
                    className={profile.submit}
                    value="Confirm changes"
                  />
                  <div className={profile.spinnerContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                      <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                    </svg>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <form
              className={profile.confirmContainer}
              onSubmit={handleProfileUpdateSubmit}
            >
              <input
                type="number"
                name="confirm_code"
                inputMode="numeric"
                placeholder="Confirmation code..."
                required
              />
              <div
                className={`${profile.submitContainer} ${
                  isPending ? profile.pending : ""
                }`}
              >
                <input
                  type="submit"
                  className={profile.submit}
                  value="Confirm changes"
                />
                <div className={profile.spinnerContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                    <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                  </svg>
                </div>
              </div>
            </form>
          )
        ) : (
          ""
        )}
        <div className={profile.actionsContainer}>
          <div className={profile.description}>Other actions:</div>
          <div className={profile.changePasswordContainer}>
            {passwordFieldOpen ? (
              <ModalWindow>
                <Form.Form handleSubmit={handleChangePasswordSubmit}>
                  <div className={profile.confirmCodeContainer}>
                    <div className={profile.formInputContainer}>
                      <Form.FormInput
                        type="number"
                        name="confirm_code"
                        label=""
                        placeholder="Enter confirmation code"
                        pattern="^.{6}$"
                        patternMessage="Confrim code should be 6 characters long"
                        required={true}
                      />
                    </div>
                    <ButtonForm
                      action={async () => {
                        const result = await sendConfirmationCode();
                        if (result) {
                          showAlert("Confirmation code resent successfully");
                        } else {
                          showAlert("Failed to resend confirmation code");
                        }
                      }}
                      value="Resend code"
                    />
                  </div>
                  <div className={profile.formInputContainer}>
                    <Form.FormInput
                      type="password"
                      name="new_password"
                      label=""
                      placeholder="Create a new password"
                      pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^\s]{8,}$"
                      patternMessage="Password should be at least 8 characters long, include at least one digit, one lowercase, and one uppercase letter, and must not contain any whitespaces."
                      required={true}
                    />
                  </div>
                  <div className={profile.submitContainer}>
                    <ButtonForm
                      action={() => setPasswordFieldOpen(false)}
                      value="Cancel"
                    />
                    <Form.FormSubmit value="Save" />
                  </div>
                </Form.Form>
              </ModalWindow>
            ) : (
              <>
                <div className={profile.changePasswordButtonContainer}>
                  <ButtonForm
                    action={async () => {
                      const result = await sendConfirmationCode();
                      if (result) {
                        showAlert("Confirmation code sent successfully");
                      } else {
                        showAlert("Failed to send confirmation code");
                      }
                      setPasswordFieldOpen(result);
                    }}
                    value="Change password"
                  />
                </div>
              </>
            )}
          </div>
          <div className={profile.deleteAccountContainer}>
            {confirmDeleteFieldOpen ? (
              <ModalWindow>
                <Form.Form handleSubmit={handleDeleteAccountSubmit}>
                  <div className={profile.formInputContainer}>
                    <Form.FormInput
                      type="number"
                      name="confirm_code"
                      label="Confirmation code"
                      placeholder="Enter confirm code..."
                      pattern="^.{6}$"
                      patternMessage="Confirmation code should be exactly 6 characters long"
                      required={true}
                    />
                  </div>
                  <div className={profile.submitContainer}>
                    <ButtonForm
                      action={() => setConfirmDeleteFieldOpen(false)}
                      value="Cancel"
                    />
                    <Form.FormSubmit value="Confirm" isPending={isPending} />
                  </div>
                </Form.Form>
              </ModalWindow>
            ) : (
              ""
            )}

            <div className={profile.deleteAccountButtonContainer}>
              <ButtonForm
                action={async () => {
                  const result = await sendConfirmationCode();
                  if (result) {
                    showAlert("Confirmation code sent successfully");
                  } else {
                    showAlert("Failed to send confirmation code");
                  }
                  setConfirmDeleteFieldOpen(result);
                }}
                value="Delete account"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
