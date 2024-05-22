export default function formatDate(inputDate) {
	// Parse the input date string
	const date = new Date(inputDate);

	// Extract the date components
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
	const year = date.getFullYear();

	// Extract the time components
	const hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, '0');

	// Format the date and time as 'DD/MM/YYYY H:MM'
	const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

	return formattedDate;
}
