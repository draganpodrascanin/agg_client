import {
	CREATE_BLOG,
	DELETE_BLOG,
	EDIT_BLOG,
	GET_BLOGS,
	PUBLISH_BLOG,
} from '../actions/action-types';

const initialState = {
	count: 1,
	blogs: [],
};

export const blogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BLOGS:
			return {
				count: action.payload.count || 1,
				blogs: [...action.payload.blogs],
			};
		case CREATE_BLOG:
			return { ...state, blogs: [action.payload, ...state.blogs] };

		//---------------------------------------------------------
		case EDIT_BLOG:
			const editedBlogs = state.blogs.map((blog) => {
				if (blog.id === action.payload.id) return action.payload;
				return blog;
			});
			return { ...state, blogs: editedBlogs };

		//---------------------------------------------------------
		case PUBLISH_BLOG:
			const publishChangeBlogs = state.blogs.map((blog) => {
				if (blog.id === action.payload.id)
					return { ...blog, published: action.payload.published };
				return blog;
			});
			return { ...state, blogs: publishChangeBlogs };
		//---------------------------------------------------------

		case DELETE_BLOG:
			const filteredBlogs = state.blogs.filter(
				(blog) => blog.id !== action.payload.id
			);
			return { ...state, blogs: filteredBlogs };
		default:
			return state;
	}
};
