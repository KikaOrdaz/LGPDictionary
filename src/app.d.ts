import { SupabaseClient, Session } from '@supabase/supabase-js'

declare namespace App {
	interface Locals {}

	interface Platform {
		env: {
			COUNTER: DurableObjectNamespace;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		};
		caches: CacheStorage & { default: Cache };
	}

	interface Session {}

	interface Stuff {}
}

declare global {
	namespace App {
	  interface Locals {
		supabase: SupabaseClient
		safeGetSession(): Promise<{ session: Session | null; user: User | null }>
	  }
	  interface PageData {
		session: Session | null
		user: User | null
	  }
	  // interface Error {}
	  // interface Platform {}
	}
  }