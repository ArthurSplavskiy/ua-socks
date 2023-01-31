import { Play } from '@/assets/icons';
import { ModalPopup } from '@/components/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModalVideo } from '@/components/PopupSystem/TemplateModal/TemplateModalVideo';
import { FC, useState } from 'react';
import ReactPlayer from 'react-player';
import './HomeVideo.scss';

export const HomeVideo: FC = () => {
	const [leftIsOpen, setLeftIsOpen] = useState(false);
	const [centerIsOpen, setCenterIsOpen] = useState(false);
	const [rightIsOpen, setRightIsOpen] = useState(false);

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
								/>
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
								/>
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
								/>
							</TemplateModalVideo>
						</ModalPopup>
					</div>
				</div>
			</div>
		</div>
	);
};
