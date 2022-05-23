import 'bootstrap/dist/css/bootstrap.min.css';
import { UploadForm } from '../components/UploadForm';
import { CustomCardList } from '../components/CustomCardList';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxvauanbgjmaiblhmety.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dmF1YW5iZ2ptYWlibGhtZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI3MTU5ODksImV4cCI6MTk2ODI5MTk4OX0.HfUGkFHs5UCU8bqFZUUpocb1bAXcxJaUk3PYoAfN_SI'
const supabase = createClient(supabaseUrl, SUPABASE_KEY)

var publications = [
    {
        fields: ['ece', 'iot'],
        title: 'Intro to IOT',
        subtitle: 'Genral instructions to build an IOT system',
        date: new Date("2022-03-25")
    },
    {
        fields: ['cse', 'ai'],
        title: 'Intro to IOT',
        subtitle: 'Genral instructions to build an IOT system',
        date: new Date("2013-11-15")
    },
    {
        fields: ['eee', 'embedded systems'],
        title: 'Intro to IOT',
        subtitle: 'Genral instructions to build an IOT system',
        date: new Date("2018-02-1")
    },
    {
        fields: ['mech', 'heat transfer'],
        title: 'Intro to IOT',
        subtitle: 'Genral instructions to build an IOT system',
        date: new Date("2019-04-2")
    },
];

export function Home(props) {
    const [loaded, setLoaded] = useState(false);

    const getPubs = async () => {
        publications = await supabase
            .from('publications')
            .select()
            .eq("user_id", props.user.id);
        
        for(var i = 0; i<publications.data.length;i+=1){
            var pub = publications.data[i];
            const { publicURL } = supabase
            .storage
            .from('publications')
            .getPublicUrl(pub.ISSN);
            publications.data[i].url = publicURL;
        }
        setLoaded(true);
    };

    function CardListPlaceHolder() {
        if (!loaded) {
            getPubs();
            return (
                <Container fluid>
                    <Row>
                        <Col xs={12} style={{ justifyContent: 'center' }} >
                            <Spinner animation="grow" style={{ marginLeft: '50%', marginBottom: '50px' }} />
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return <CustomCardList publications={publications.data} />
        }
    };

    return (
        <div>
            <UploadForm user={props.user} />
            <CardListPlaceHolder />
        </div>
    );
}