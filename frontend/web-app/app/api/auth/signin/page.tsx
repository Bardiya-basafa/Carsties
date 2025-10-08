import EmptyFilter from "@/app/components/EmptyFilter";

export default function SignIn({ searchParams }: { searchParams: { callbackUrl: string } }) {
    return (
        <EmptyFilter title={'you need to be logged in'} subtitle={'please click login below'} showLogin callBackUrl={searchParams.callbackUrl} />
    )
}