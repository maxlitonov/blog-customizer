import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

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

	const handleOptionChange = (option: string, value: OptionType) => {
		setFormState({ ...formState, [option]: value });
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
					<Text weight={800} as='h1' uppercase={true} size={31}>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						selected={formState.fontFamilyOption}
						onChange={(value) => {
							handleOptionChange('fontFamilyOption', value);
						}}></Select>

					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => {
							handleOptionChange('fontSizeOption', value);
						}}
						title='Размер шрифта'></RadioGroup>

					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={formState.fontColor}
						onChange={(value) => {
							handleOptionChange('fontColor', value);
						}}></Select>

					<Separator></Separator>

					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={formState.backgroundColor}
						onChange={(value) => {
							handleOptionChange('backgroundColor', value);
						}}></Select>

					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={formState.contentWidth}
						onChange={(value) => {
							handleOptionChange('contentWidth', value);
						}}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
