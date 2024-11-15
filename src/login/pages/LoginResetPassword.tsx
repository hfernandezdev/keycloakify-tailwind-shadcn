import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Input } from "../../components/ui/input";
export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={
                <div id="kc-registration" className="">
                    <span id="kc-page-subtitle">
                        Having troubles?
                    </span>
                    <a tabIndex={9} href="#" className="link-style ">
                        Contact Support
                    </a>
                </div>
            }
            headerNode={"Forgot Password"}
        >

            <p id="kc-page-subtitle" style={{ marginTop: -20 }}>Please complete with your registered email and follow the instructions</p>
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                            {msg("email")}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            // className={kcClsx("kcInputClass")}
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("username")
                                }}
                            />
                        )}
                    </div>
                </div>
                <div style={{ marginTop: 150 }}>
                    <div id="kc-form-buttons" className="">
                        <input
                            // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            className={cn(buttonVariants({ variant: "default" }), "w-full ")}
                            type="submit"
                            value={"SEND"}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
