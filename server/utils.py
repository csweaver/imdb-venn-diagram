import re


def intense_get(dictionary, key_list, default=None):
	print(dictionary)
	result = None
	for k in key_list:
		result = dictionary.get(k, None)
		print(k, result)
		if result:
			break
	if not result:
		result = default
	return result


PATTERNS = [
	re.compile(p) for p in [
		"\d+\s[Ee]pisodes? ?",
		"19\d\d ?",
		"20\d\d ?",
		"\n",
		"\t",
		"  ",
		" $"
	]
]

def clean_name(name):
	for pattern in PATTERNS:
		name = re.sub(pattern, "", name)
	return name