import { Container } from '@material-ui/core';
import React from 'react';
import { Header } from '../components/Header';
import { useParams } from 'react-router-dom';
import EditBlog from '../components/Blogs/EditBlog';

const IzmeniBlog = () => {
	const blogId = useParams().id;

	return (
		<div>
			<Container>
				<Header
					breadcrums={[
						{ name: 'Blog', path: '/blog' },
						{ name: 'Blog Kreator', path: `/blog/${blogId}/edit` },
					]}
				>
					Izmeni Blog
				</Header>
			</Container>
			<EditBlog />
		</div>
	);
};

export default IzmeniBlog;
