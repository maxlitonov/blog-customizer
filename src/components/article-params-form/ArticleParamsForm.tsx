import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	isOpen: boolean;
	onArrowClick: () => void;
	onSubmit: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onArrowClick,
	onSubmit,
}: TArticleParamsFormProps) => {
	const formRef = useRef<HTMLElement | null>(null);
	const [formState, setFormState] = useState(defaultArticleState);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | Event) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				onArrowClick();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);
	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		onSubmit(formState);
	};

	const handleReset = (evt: FormEvent) => {
		evt.preventDefault();
		onSubmit(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowClick} />

			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text weight={800} as='h1' uppercase size={31}>
						Задайте параметры
					</Text>
					<Text weight={800} as='p' uppercase size={12}>
						Шрифт
					</Text>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
