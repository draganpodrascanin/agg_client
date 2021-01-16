import { Container } from '@material-ui/core';
import React from 'react';
import { Header } from '../components/Header';
import CreateBlog from '../components/Blogs/CreateBlog';

const BlogKreator = () => {
	return (
		<div>
			<Container>
				<Header
					breadcrums={[
						{ name: 'Blog', path: '/blog' },
						{ name: 'Blog Kreator', path: '/blog/create' },
					]}
				>
					Novi Blog
				</Header>
			</Container>
			<CreateBlog />
		</div>
	);
};

export default BlogKreator;
