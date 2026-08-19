<script lang="ts">
	import { BUSINESS_NAME } from '$lib/config';
	import { waLink } from '$lib/whatsapp';

	const href = waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`);
</script>

<a {href} target="_blank" rel="noopener" class="whatsapp-float" aria-label="Book on WhatsApp">
	<span class="wa-label">Book on WhatsApp</span>
	<span aria-hidden="true">💬</span>
</a>
