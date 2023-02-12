import { Play } from '@/assets/icons';
import { ModalPopup } from '@/components/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModalVideo } from '@/components/PopupSystem/TemplateModal/TemplateModalVideo';
import { Loader } from '@/components/shared/Loader';
import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './HomeVideo.scss';

export const HomeVideo: FC = () => {
	const [leftIsOpen, setLeftIsOpen] = useState(false);
	const [centerIsOpen, setCenterIsOpen] = useState(false);
	const [rightIsOpen, setRightIsOpen] = useState(false);
	const [isLoadingLeft, setIsloadingLeft] = useState(true);
	const [isLoadingCenter, setIsloadingCenter] = useState(true);
	const [isLoadingRight, setIsloadingRight] = useState(true);

	useEffect(() => {
		if (!rightIsOpen) {
			setIsloadingRight(true);
		}
		if (!centerIsOpen) {
			setIsloadingCenter(true);
		}
		if (!leftIsOpen) {
			setIsloadingLeft(true);
		}
	}, [leftIsOpen, centerIsOpen, rightIsOpen]);

	return (
		<div className={`HomeVideo section-offset`}>
			<div className={`HomeVideo-placeholder`}>
				<div className={`HomeVideo-placeholder-center`}>
					<div className={`HomeVideo-placeholder-left`}>
						<img src='/images/left-placeholder.svg' alt='' />
						<button onClick={() => setLeftIsOpen(true)}>
							<Play />
						</button>
						<ModalPopup
							type='video'
							show={leftIsOpen}
							withBackdrop={true}
							onClose={() => setLeftIsOpen(false)}>
							<TemplateModalVideo>
								<ReactPlayer
									url={leftIsOpen ? 'https://www.youtube.com/watch?v=lR8wafJfSxg' : ''}
									onReady={() => setIsloadingLeft(false)}
								/>
								{isLoadingLeft && <Loader />}
							</TemplateModalVideo>
						</ModalPopup>
					</div>
					<div className={`HomeVideo-placeholder-center-inner`}>
						<img src='/images/center-placeholder.svg' alt='' />
						<button onClick={() => setCenterIsOpen(true)}>
							<Play />
						</button>
						<ModalPopup
							type='video'
							show={centerIsOpen}
							withBackdrop={true}
							onClose={() => setCenterIsOpen(false)}>
							<TemplateModalVideo>
								<ReactPlayer
									url={centerIsOpen ? 'https://www.youtube.com/watch?v=lR8wafJfSxg' : ''}
									onReady={() => setIsloadingCenter(false)}
								/>
								{isLoadingCenter && <Loader />}
							</TemplateModalVideo>
						</ModalPopup>
					</div>
					<div className={`HomeVideo-placeholder-right`}>
						<img src='/images/right-placeholder.svg' alt='' />
						<button onClick={() => setRightIsOpen(true)}>
							<Play />
						</button>
						<ModalPopup
							type='video'
							show={rightIsOpen}
							withBackdrop={true}
							onClose={() => setRightIsOpen(false)}>
							<TemplateModalVideo>
								<ReactPlayer
									url={rightIsOpen ? 'https://www.youtube.com/watch?v=lR8wafJfSxg' : ''}
									onReady={() => setIsloadingRight(false)}
								/>
								{isLoadingRight && <Loader />}
							</TemplateModalVideo>
						</ModalPopup>
					</div>
				</div>
			</div>
		</div>
	);
};
