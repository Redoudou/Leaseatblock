const styles = {
  '@keyframes pageLoad': {
    from: {opacity: 0},
    to: {opacity: 1}
  },
  root: {
    paddingTop: '5em',
    animation: '$pageLoad 3s'
  },
  c1: {    
    maxWidth: '1200px',
    margin: '0 auto'
  },
  s1: {
    textAlign: 'left',
    padding: '2em',

  },
  logo: {
    marginLeft: '-1.3em'
  },
  purple: {
    backgroundColor: '#250A3C',
    minHeight: '.3em',
    maxWidth: '100%',
    marginBottom: '1em',
    marginLeft: '0rem'
  },
  title1: {
    paddingLeft: '.4em'
  },
  sub1: {
  },
  button1: {
    marginTop: '2em',
    marginLeft: '.7em',
    backgroundColor: '#E86D48',
  },
  buttonT: {
    color: 'white',
    fontSize: '120%'
  },
  i1: {
    width: '40em',
    padding: '1em'
  },
  cardBig: {
    backgroundColor: '#250A3C',
    padding: '3em'
  },
  c2: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  s2: {
    paddingLeft: '1em',
    padding: '2em',
    marginTop: '-5em',
    textAlign: 'left',
  },
  orange: {
    backgroundColor: '#E86D48',
    minHeight: '.2em',
    maxWidth: '50%',
    marginBottom: '2em'
  },
  line: {
    color: '#E86D48'
  },
  title2: {
    paddingRight: '.4em'
  },
  sub2: {
  },
  i2: {
    width: '40em',
  },
  card: {
    textAlign: 'left',
    padding: '1.5em',
    backgroundColor: '#250A3C'
  }
}

export default styles