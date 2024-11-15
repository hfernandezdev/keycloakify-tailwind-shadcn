import { useState, useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { checkboxVariants } from "../../components/ui/checkbox";

import { Separator } from "../../components/ui/separator";
import { PasswordWrapper } from "../../components/ui/PasswordWrapper";
import SocialProviders from "../../components/ui/SocialProviders";
export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <>
            <Template
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayMessage={!messagesPerField.existsError("username", "password")}
                headerNode={"Welcome!"}
                displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
                infoNode={
                    <>
                        <div className="text-center mb-5">
                            <a tabIndex={8} href="#" className="link-style ">
                                Skip for now
                            </a>
                        </div>
                        <div id="kc-registration" className="">
                            <span id="kc-page-subtitle">
                                Do you want a demo user?
                            </span>
                            <a tabIndex={9} href={url.registrationUrl} className="link-style ">
                                Contact us
                            </a>
                        </div>
                    </>
                }
                socialProvidersNode={<SocialProviders social={social} kcClsx={kcClsx} clsx={clsx} msg={msg} realm={realm} />}
            >
                <div id="kc-form">
                    <div id="kc-form-wrapper">
                        <p id="kc-page-subtitle" style={{ marginTop: -20 }}>Login into your account</p>
                        {realm.password && (
                            <form
                                id="kc-form-login"
                                onSubmit={() => {
                                    setIsLoginButtonDisabled(true);
                                    return true;
                                }}
                                action={url.loginAction}
                                method="post"
                                className="space-y-6"
                            >
                                {!usernameHidden && (
                                    <div>
                                        <Label htmlFor="username" className="text-lg">
                                            {msg("email")}
                                        </Label>
                                        <Input
                                            tabIndex={2}
                                            id="username"
                                            className=""
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <div
                                                // id="input-error"
                                                className="input-error py-3"
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: messagesPerField.getFirstError("username", "password")
                                                }}
                                            />
                                        )}
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="password" className="text-lg">
                                        {msg("password")}
                                    </Label>
                                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                        <Input
                                            tabIndex={3}
                                            id="password"
                                            className="text-foreground"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                    </PasswordWrapper>
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: messagesPerField.getFirstError("username", "password")
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="space-y-2 text-lg ">
                                    <div className=" link-style text-right">
                                        {realm.resetPasswordAllowed && (
                                            <span>
                                                <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                    {msgStr("doForgotPassword")}
                                                </a>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                    <Input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                                    <Button tabIndex={7} disabled={isLoginButtonDisabled} type="submit" className="w-full ">
                                        LOGIN
                                    </Button>
                                </div>
                                <Separator />
                            </form>
                        )}
                    </div>
                </div>
            </Template>
        </>
    );
}
