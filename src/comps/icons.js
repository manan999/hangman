import Svg, { G, Polygon, Path, Circle, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Ionicons from "@react-native-vector-icons/ionicons";
import FontAwesome from "@react-native-vector-icons/fontawesome";

const Cross = ({ color }) => {
	const str = color ? "red" : "grey";
	return <Ionicons name="heart" size={24} color={str} />;
};

const Gem = ({ size = 18, color = "purple" }) => {
	const palettes = {
		purple: {
			top: "#D5B4E8",
			center: "#933EC5",
			bottomRight: "#6D2C93",
			topLeft: "#B87FD9",
			bottomLeft: "#7B1FA2",
		},
		cyan: {
			top: "#E0F7FA",
			center: "#26C6DA",
			bottomRight: "#0097A7",
			topLeft: "#80DEEA",
			bottomLeft: "#00ACC1",
		},
		gold: {
			top: "#FFF9C4",
			center: "#FFD54F",
			bottomRight: "#FFA000",
			topLeft: "#FFE082",
			bottomLeft: "#FFB300",
		},
	};
	const c = palettes[color] || palettes.purple;

	return (
		<Svg width={size} height={size} viewBox="0 0 495 495">
			<G>
				<Polygon fill={c.top} points="371.25,13.806 123.75,13.806 247.5,182.432" />
				<Polygon fill={c.bottomRight} points="247.5,182.432 247.5,481.194 495,182.432" />
				<Polygon fill={c.center} points="495,182.432 371.25,13.806 247.5,182.432" />
				<Polygon fill={c.topLeft} points="123.75,13.806 0,182.432 247.5,182.432" />
				<Polygon fill={c.bottomLeft} points="0,182.432 247.5,481.194 247.5,182.432" />
			</G>
		</Svg>
	);
};

const Key = ({ size = 18 }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 64 64">
			<Defs>
				<LinearGradient id="goldKeyGrad" x1="0" y1="0" x2="1" y2="1">
					<Stop offset="0%" stopColor="#FFE082" />
					<Stop offset="50%" stopColor="#FFB300" />
					<Stop offset="100%" stopColor="#FF8F00" />
				</LinearGradient>
				<LinearGradient id="goldKeyHighlight" x1="0" y1="0" x2="0" y2="1">
					<Stop offset="0%" stopColor="#FFF9C4" />
					<Stop offset="100%" stopColor="#FFE082" />
				</LinearGradient>
				<LinearGradient id="goldKeyShadow" x1="0" y1="0" x2="0" y2="1">
					<Stop offset="0%" stopColor="#FFA000" />
					<Stop offset="100%" stopColor="#C77700" />
				</LinearGradient>
			</Defs>
			{/* Key Bow (Ring) */}
			<Path
				fill="url(#goldKeyGrad)"
				fillRule="evenodd"
				d="M20,6 C28.84,6 36,13.16 36,22 C36,30.84 28.84,38 20,38 C11.16,38 4,30.84 4,22 C4,13.16 11.16,6 20,6 Z M20,13 C15.03,13 11,17.03 11,22 C11,26.97 15.03,31 20,31 C24.97,31 29,26.97 29,22 C29,17.03 24.97,13 20,13 Z"
			/>
			{/* Highlight arc on bow */}
			<Path
				fill="none"
				stroke="url(#goldKeyHighlight)"
				strokeWidth="1.5"
				strokeLinecap="round"
				d="M8,22 C8,15.37 13.37,10 20,10"
			/>
			{/* Inner shadow */}
			<Circle
				cx="20"
				cy="22"
				r="9"
				fill="none"
				stroke="url(#goldKeyShadow)"
				strokeWidth="1"
				opacity="0.6"
			/>
			{/* Collar */}
			<Rect x="34" y="19" width="4" height="6" rx="1.5" fill="url(#goldKeyShadow)" />
			{/* Shaft */}
			<Path
				d="M36,19.5 L58,19.5 C59.1,19.5 60,20.4 60,21.5 L60,22.5 C60,23.6 59.1,24.5 58,24.5 L36,24.5 Z"
				fill="url(#goldKeyGrad)"
			/>
			<Path
				d="M36,20 L58,20"
				stroke="url(#goldKeyHighlight)"
				strokeWidth="1"
				strokeLinecap="round"
			/>
			{/* Teeth / Bits */}
			<Path
				d="M47,24.5 L47,33 C47,33.5 47.5,34 48,34 L50,34 C50.5,34 51,33.5 51,33 L51,24.5 Z"
				fill="url(#goldKeyGrad)"
			/>
			<Path
				d="M54,24.5 L54,37 C54,37.5 54.5,38 55,38 L57.5,38 C58,38 58.5,37.5 58.5,37 L58.5,24.5 Z"
				fill="url(#goldKeyGrad)"
			/>
		</Svg>
	);
};

const Icon = ({ type, size = 18 }) => {
	switch (type) {
		case 'key':
			return <Key size={size} />;
		case 'gear':
			return <FontAwesome name="gear" size={size} color="white" />;
		case 'phone':
			return <FontAwesome name="phone" size={size} color="#4CAF50" />;
		case 'thanks':
			return <Ionicons name="flower" size={size} color="#FFD54F" />;
		case 'web':
			return <Ionicons name="globe-outline" size={size} color="#2196F3" />;
		case 'email':
			return <Ionicons name="mail" size={size} color="#EA4335" />;
		case 'fb':
			return <FontAwesome name="facebook-square" size={size} color="#1877F2" />;
		case 'ig':
			return <FontAwesome name="instagram" size={size} color="#E4405F" />;
		case 'li':
			return <FontAwesome name="linkedin-square" size={size} color="#0A66C2" />;
		case 'yt':
			return <FontAwesome name="youtube-play" size={size} color="#FF0000" />;
		case 'tw':
			return <FontAwesome name="twitter" size={size} color="#1DA1F2" />;
		default:
			return null;
	}
};

export { Cross, Gem, Key, Icon };