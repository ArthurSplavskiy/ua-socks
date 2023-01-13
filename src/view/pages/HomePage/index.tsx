import { Button } from '@/components/shared/Button';
import { useDevice } from '@/context/DeviceContext';
import axios from '../../../api/axios';
import { FC, useEffect } from 'react';
import { Logo } from '@/assets/icons';

export default function HomePage() {
	const { isTablet } = useDevice();
	return <div style={{ margin: '20px' }}></div>;
}
