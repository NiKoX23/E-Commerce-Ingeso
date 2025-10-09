import { Card } from "primereact/card";

export default function Dashboard() {
    return (
        <div 
            style={{
                minHeight: '100vh',
                boxSizing: 'border-box',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'flex-start', 
                background: 'linear-gradient(135deg, #000000ff, #9e0505ff)',
            }}>
            
            <h1 style={{ 
                textAlign: 'center',
                marginBottom: '2rem',
                color: '#fff',
                textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
            }}>
                Catalogo de productos
            </h1>

            <div
                style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2rem', 
                }}>

                <Card 
                    title="Futbol"
                    style={{
                        width: '200px',
                        height:'100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:'center',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#02fff2ff',
                        padding: '2rem',
                        textAlign: 'center',
                    }}></Card> 

                <Card 
                    title="Tenis"
                    style={{
                        width: '200px',
                        height:'100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:'center',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#02fff2ff',
                        padding: '2rem',
                        textAlign: 'center',
                    }}></Card> 

                <Card 
                    title="Basketball"
                    style={{
                        width: '200px',
                        height:'100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:'center',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#02fff2ff',
                        padding: '2rem',
                        textAlign: 'center',
                    }}></Card> 

                <Card 
                    title="Boxeo"
                    style={{
                        width: '200px',
                        height:'100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:'center',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#02fff2ff',
                        padding: '2rem',
                        textAlign: 'center',
                    }}></Card> 
                <Card 
                    title="Running"
                    style={{
                        width: '200px',
                        height:'100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:'center',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#02fff2ff',
                        padding: '2rem',
                        textAlign: 'center',
                    }}></Card> 
            </div>
        </div>
    );
}