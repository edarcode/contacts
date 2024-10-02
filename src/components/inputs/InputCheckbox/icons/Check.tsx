type SVGProps = React.SVGProps<SVGSVGElement>;

export default function Check(props: SVGProps) {
	return (
		<svg
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			width="64"
			height="64"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M5 13l4 4L19 7"
			></path>
		</svg>
	);
}
