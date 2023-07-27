import {
	Table,
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';
import { FC } from 'react';

const rules: string[] = [
	'Правило',
	'Ещё какое-то правило',
	'Ну и ещё одно',
	'И ещё одно невероятно большое правило, которое должно вообще нигде не помещаться, да',
];
const Game: FC = () => {
	return (
		<div className=' grow flex flex-col items-center justify-center'>
			<div>
				<Table className='mt-10'>
					<TableCaption>Правила игры</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-10'>#</TableHead>
							<TableHead className=''>Описание</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rules.map((rule, i) => (
							<TableRow key={i}>
								<TableCell className='font-medium'>{i + 1}</TableCell>
								<TableCell className=''>{rule}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default Game;
