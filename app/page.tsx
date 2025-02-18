import CalendateHero from '@/components/calendate-hero';
import Hero from '@/components/hero';
import ConnectSupabaseSteps from '@/components/tutorial/connect-supabase-steps';
import SignUpUserSteps from '@/components/tutorial/sign-up-user-steps';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';

export default async function Home() {
	return (
		<>
			<CalendateHero />
			<Hero />
			<main className='flex-1 flex flex-col gap-6 px-4'>
				<h2 className='font-medium text-xl mb-4'>Create an Event</h2>
				{hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
			</main>
		</>
	);
}
