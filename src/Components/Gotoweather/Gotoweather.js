import { Link } from 'react-router-dom';

export default function Gotoweather() {
    return (
        <div>
            <Link to = '/Weather'>
                <strong>Go to Weather</strong>
            </Link>
        </div>

    )
}