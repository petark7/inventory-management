const Loading = ({ isLoading, children }) => (
	isLoading ? <div>Loading...</div> : children
);

export default Loading;
