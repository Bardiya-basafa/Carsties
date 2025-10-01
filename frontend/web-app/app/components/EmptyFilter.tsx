'use client'
import {useParamsStore} from "@/hooks/useParamsStore";
import {Button} from "flowbite-react";
import {signIn} from "next-auth/react";
import Heading from "@/app/components/Heading";

type Props = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
    callBackUrl?: string;
}
export default function EmptyFilter({
                                        title = 'No matches for this filter',
                                        subtitle = 'try changing or reseting the filter',
                                        showReset,
                                        showLogin,
                                        callBackUrl
                                    }: Props) {
    const reset = useParamsStore(state => state.reset);
    return (
        <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
            <Heading title={title} subtitle={subtitle} center/>
            <div className="mt-4">
                {showReset && (
                    <Button outline onClick={reset}>Remove Filters</Button>
                )} {showLogin && (
                <Button outline onClick={() => signIn('id-server', {redirectTo: callBackUrl})}>Login</Button>
            )}
            </div>
        </div>
    )
}