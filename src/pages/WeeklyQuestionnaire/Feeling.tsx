import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import QuestionText from '../../components/Text/QuestionText';
import NextButton from './NextButton';

import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import classes from './styles.module.scss'

export default function Feeling() {
    return (<div style={{ padding: "1em" }}>
        <QuestionText>How are you feeling today?</QuestionText>
        <Box padding="2em 0">
            <RadioGroupRating />
        </Box>
    </div>)
}

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

function RadioGroupRating() {
    return (
        <Rating
            classes={{ icon: classes.ratingItem }}
            name="highlight-selected-only"
            defaultValue={2}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
        />
    );
}