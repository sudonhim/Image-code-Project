import ast

allowed_functions = set([
	#math library
	'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh',
	'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf',
	'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod',
	'frexp', 'fsum', 'gamma', 'hypot', 'isinf', 'isnan', 'ldexp',
	'lgamma', 'log', 'log10', 'log1p', 'modf', 'pi', 'pow', 'radians',
	'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc',
        #random library
        'Random','WichmannHill', 'betavariate', 'choice', 'division',
        'expovariate', 'gammavariate', 'gauss', 'getrandbits', 'getstate',
        'jumpahead', 'lognormvariate', 'normalvariate', 'paretovariate',
        'randint', 'random', 'randrange', 'sample', 'seed', 'setstate',
        'shuffle', 'triangular', 'uniform', 'vonmisesvariate',
        'weibullvariate', 'SystemRandom',
	#builtins
	'abs', 'max', 'min', 'range', 'xrange', 'break', 'int'
	])

allowed_node_types = set([
	#Meta
	'Module', 'Assign', 'Expr',
	#Control
	'For', 'If', 'Else', 'Break', 'While',
	#Data
	'Store', 'Load', 'AugAssign', 'Subscript', 'Index',
	#Datatypes
	'Num', 'Tuple', 'List',
	#Operations
	'BinOp', 'UnaryOp', 'Add', 'Sub', 'Mult', 'Div', 'Mod', 'Pow',
        'Compare', 'Lt', 'Gt', 'Eq', 'NotEq', 'LtE', 'GtE','RShift',
        'LShift', 'BitXor'
	])

safe_names = set([
	'True', 'False', 'None'
	])
	

class SyntaxChecker(ast.NodeVisitor):
	
	def check(self, syntax):
		tree = ast.parse(syntax)
		self.passed=True
		self.visit(tree)
		
	def visit_Call(self, node):
		if node.func.id not in allowed_functions:
			raise SyntaxError("%s is not an allowed function!"%node.func.id)
		else:
			ast.NodeVisitor.generic_visit(self, node)
		
	def visit_Name(self, node):
		try:
			eval(node.id)
		except NameError:
			ast.NodeVisitor.generic_visit(self, node)
		else:
			if node.id not in safe_names and node.id not in allowed_functions:
				raise SyntaxError("%s is a reserved name!"%node.id)
			else:
				ast.NodeVisitor.generic_visit(self, node)
		
	def generic_visit(self, node):
		if type(node).__name__ not in allowed_node_types:
			raise SyntaxError("%s is not allowed!"%type(node).__name__)
		else:
			ast.NodeVisitor.generic_visit(self, node)

if __name__ == '__main__':
	x = SyntaxChecker()
	while True:
		try:
			x.check(raw_input())
		except Exception as e:
			print e
