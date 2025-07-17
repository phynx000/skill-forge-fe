import { Button, Flex } from 'antd';

const CardCourse: React.FC = () => (
    <Flex wrap gap="small">
        {Array.from({ length: 24 }, (_, i) => (
            <Button key={i} type="primary">
                Button
            </Button>
        ))}
    </Flex>
);

export default CardCourse;
